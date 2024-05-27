require("@nomicfoundation/hardhat-toolbox");

task("accounts", "Prints the list of accounts (with balance in ETH)", async (_, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address, await hre.ethers.provider.getBalance(account.address), "Wei");
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
};
