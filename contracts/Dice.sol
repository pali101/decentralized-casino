// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {RandomnessReceiverBase} from "randomness-solidity/src/RandomnessReceiverBase.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract DiceGame is RandomnessReceiverBase, ReentrancyGuard {
    // Casino parameters
    uint256 public minBet;
    uint256 public maxBet;

    /// @notice Stores the latest received randomness value
    bytes32 public randomness;

    /// @notice Stores the request ID of the latest randomness request
    uint256 public requestId;

    struct Bet {
        address player;
        uint256 amount;
        uint8 prediction;
        bool settled;
        uint256 payout;
    }

    mapping(uint256 => Bet) public bets;

    event BetPlaced(address indexed player, uint256 betAmount, uint8 prediction);
    event DiceRolled(address indexed player, uint8 result, uint256 payout);
    event RandomnessRequested(uint256 indexed requestId);
    event RandomnessFulfilled(uint256 indexed requestId, bytes32 randomValue);

    /// @notice Initializes the contract with the address of the randomness sender and bet limits
    /// @param _minBet The minimum bet amount
    /// @param _maxBet The maximum bet amount
    /// @param _randomnessSender The address of the randomness sender
    constructor(uint256 _minBet, uint256 _maxBet, address _randomnessSender)
        payable
        RandomnessReceiverBase(_randomnessSender, msg.sender)
    {
        require(msg.value >= _maxBet * 6, "Initial deposit must be at least maxBet * 6");

        minBet = _minBet;
        maxBet = _maxBet;
    }

    receive() external payable {}
    fallback() external payable {}

    function setBetLimits(uint256 _minBet, uint256 _maxBet) external onlyOwner {
        require(_minBet <= _maxBet, "min > max");
        require(_maxBet <= address(this).balance / 6, "maxBet too high for bankroll");
        minBet = _minBet;
        maxBet = _maxBet;
    }

    function placeBet(uint8 prediction) external payable nonReentrant returns (uint256) {
        require(msg.value >= minBet && msg.value <= maxBet, "Bet amount out of range");
        require(prediction >= 1 && prediction <= 6, "Prediction must be between 1 and 6");
        require(address(this).balance >= msg.value * 6, "Insufficient bankroll");

        uint32 callbackGasLimit = 150_000;
        uint256 fee = calculateRequestPriceNative(callbackGasLimit);
        require(address(this).balance >= msg.value * 6 + fee, "Insufficient ETH in dice betting contract");

        // Make the request via native-pay flow
        (uint256 rid,) = _requestRandomnessPayInNative(callbackGasLimit);

        requestId = rid;

        bets[rid] = Bet({player: msg.sender, amount: msg.value, prediction: prediction, settled: false, payout: 0});

        emit RandomnessRequested(rid);
        emit BetPlaced(msg.sender, msg.value, prediction);

        maxBet = address(this).balance / 6;
        return rid;
    }

    function depositFunds() external payable onlyOwner {}

    function withdrawFunds(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient funds");
        (bool ok,) = payable(owner()).call{value: amount}("");
        require(ok, "Withdraw failed");

        maxBet = address(this).balance / 6;
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function calculateRequestPriceNative(uint32 _callbackGasLimit) public view returns (uint256) {
        return randomnessSender.calculateRequestPriceNative(_callbackGasLimit);
    }

    /// @notice Called by the randomnessSender to fulfill the request
    function onRandomnessReceived(uint256 requestID, bytes32 _randomness) internal override {
        Bet storage b = bets[requestID];
        require(b.player != address(0), "Unknown request");
        require(!b.settled, "Already settled");

        randomness = _randomness;

        uint8 diceResult = uint8(uint256(_randomness) % 6) + 1;
        uint256 payout = diceResult == b.prediction ? b.amount * 6 : 0;

        b.settled = true;
        b.payout = payout;

        emit RandomnessFulfilled(requestID, _randomness);
        emit DiceRolled(b.player, diceResult, payout);

        if (payout > 0) {
            (bool ok,) = payable(b.player).call{value: payout}("");
            require(ok, "Payout failed");
        }

        maxBet = address(this).balance / 6;
    }

    function quoteFee(uint32 callbackGasLimit) external view returns (uint256) {
        return randomnessSender.calculateRequestPriceNative(callbackGasLimit);
    }
}
