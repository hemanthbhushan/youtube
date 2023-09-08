const BN = require("ethers").BigNumber;
const { ethers } = require("hardhat");
const {
    time, // time
    constants,
  } = require("@openzeppelin/test-helpers");
const { factory } = require("typescript");
const ether = require("@openzeppelin/test-helpers/src/ether");

function expandTo18Decimals(n) {
  return BN.from(n).mul(BN.from(10).pow(18));
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function main () {
    const [deployer] = await ethers.getSigners();
    const { chainId } = await ethers.provider.getNetwork();


    let Impl = await ethers.getContractFactory("GeneralMP");

        token = await Impl.deploy("0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B", "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6");
        await token.deployed();
        console.log("GMP", token.address);

  
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });