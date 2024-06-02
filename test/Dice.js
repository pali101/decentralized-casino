const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DiceGame", function () {
  let DiceGame, diceGame, owner, addr1, addr2;
  
  beforeEach(async function () {
    DiceGame = await ethers.getContractFactory("DiceGame");
    [owner, addr1, addr2, _] = await ethers.getSigners();
    
    console.log("Deploying DiceGame contract...");
    diceGame = await DiceGame.deploy(ethers.parseEther("0.1"), ethers.parseEther("1"), { value: ethers.parseEther("6") });
    // console.log(diceGame);
    console.log(`DiceGame contract deployed at address: ${diceGame.address}`);
    
    console.log("Setting up test environment...");
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await diceGame.owner()).to.equal(owner.address);
    });

    it("Should set the correct bet limits", async function () {
      expect(await diceGame.minBet()).to.equal(ethers.parseEther("0.1"));
      expect(await diceGame.maxBet()).to.equal(ethers.parseEther("1"));
    });

    it("Should have initial balance of 6 * maxBet", async function () {
      expect(await diceGame.getContractBalance()).to.equal(ethers.parseEther("6"));
    });
  });

  describe("Betting", function () {
    it("Should emit BetPlaced and DiceRolled events", async function () {
      await ethers.provider.send("evm_mine"); // mine a new block to ensure timestamp changes
      await expect(diceGame.connect(addr1).placeBet(4, { value: ethers.parseEther("0.5") }))
        .to.emit(diceGame, "BetPlaced")
        .withArgs(addr1.address, ethers.parseEther("0.5"), 4)
        .and.to.emit(diceGame, "DiceRolled");
    });

    it("Should revert if bet amount is out of range", async function () {
      await expect(diceGame.connect(addr1).placeBet(4, { value: ethers.parseEther("0.05") })).to.be.revertedWith("Bet amount out of range");
      await expect(diceGame.connect(addr1).placeBet(4, { value: ethers.parseEther("2") })).to.be.revertedWith("Bet amount out of range");
    });

    it("Should revert if prediction is out of range", async function () {
      await expect(diceGame.connect(addr1).placeBet(0, { value: ethers.parseEther("0.5") })).to.be.revertedWith("Prediction must be between 1 and 6");
      await expect(diceGame.connect(addr1).placeBet(7, { value: ethers.parseEther("0.5") })).to.be.revertedWith("Prediction must be between 1 and 6");
    });
  });

  describe("Owner functions", function () {
    it("Should allow the owner to deposit funds", async function () {
      await diceGame.depositFunds({ value: ethers.parseEther("10") });
      expect(await diceGame.getContractBalance()).to.equal(ethers.parseEther("16"));
    });

    it("Should allow the owner to withdraw funds", async function () {
      await diceGame.withdrawFunds(ethers.parseEther("1"));
      expect(await diceGame.getContractBalance()).to.equal(ethers.parseEther("5"));
    });

    it("Should fail if a non-owner tries to withdraw funds", async function () {
      await expect(diceGame.connect(addr1).withdrawFunds(ethers.parseEther("1"))).to.be.revertedWith("Only the owner can perform this action");
    });
  });
});
