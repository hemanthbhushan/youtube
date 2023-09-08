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


    let Impl = await ethers.getContractFactory("TwoWayMP");

        token = await Impl.deploy("0x4D147dCb984e6affEEC47e44293DA442580A3Ec0", "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6");
        await token.deployed();
        console.log("TwoWayMP address: ", token.address);

  
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });