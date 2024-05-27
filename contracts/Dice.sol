// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Dice is ownable, VRFConsumerBase {
    using SafeMath for uint256;

    address public owner; // owner of the contract
    uint256 public minimumBet; // minimum bet amount
    uint256 public maximumBet; // maximum bet amount
    uint256 public houseFee;   // house fee in percentage
    bytes32 internal keyHash; // key hash for chainlink vrf
    uint256 internal fee;    // fee for chainlink vrf
    mapping(bytes32 => address) public requestToSender; // mapping from request id to sender
    mapping(bytes32 => uint256) public requestToBetAmount; // mapping from request id to bet amount

    constructor(uint256 _minimumBet, uint256 _maximumBet, uint256 _houseFee) {
        owner = msg.sender;
        minimumBet = _minimumBet; 
        maximumBet = _maximumBet; 
        houseFee = _houseFee;
    }
}