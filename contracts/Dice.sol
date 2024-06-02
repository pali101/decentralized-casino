// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DiceGame {
    address public owner;
    uint256 public minBet;
    uint256 public maxBet;

    event BetPlaced(address indexed player, uint256 betAmount, uint8 prediction);
    event DiceRolled(address indexed player, uint8 result, uint256 payout);

    constructor(uint256 _minBet, uint256 _maxBet) payable {
        require(msg.value >= _maxBet * 6, "Initial deposit must be at least maxBet * 6");
        
        owner = msg.sender;
        minBet = _minBet;
        maxBet = _maxBet;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function setBetLimits(uint256 _minBet, uint256 _maxBet) external onlyOwner {
        minBet = _minBet;
        maxBet = _maxBet;
    }

    function placeBet(uint8 prediction) external payable {
        require(msg.value >= minBet && msg.value <= maxBet, "Bet amount out of range");
        require(prediction >= 1 && prediction <= 6, "Prediction must be between 1 and 6");

        uint8 diceResult = rollDice();
        // uint8 diceResult = 1;
        uint256 payout = 0;

        if (diceResult == prediction) {
            payout = msg.value * 6;
            payable(msg.sender).transfer(payout);
        }

        maxBet = address(this).balance / 6;

        emit BetPlaced(msg.sender, msg.value, prediction);
        emit DiceRolled(msg.sender, diceResult, payout);
    }

    function rollDice() private view returns (uint8) {
        uint8 diceResult = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender))) % 6 + 1);
        return diceResult;
    }

    function depositFunds() external payable onlyOwner {}

    function withdrawFunds(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient funds");
        payable(owner).transfer(amount);
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
