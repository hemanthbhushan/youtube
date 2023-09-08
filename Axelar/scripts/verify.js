const Hre = require("hardhat");
const BN = require("ethers").BigNumber;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function main() {

    await Hre.run("verify:verify", {
      //Deployed contract Token address
      address: "0xA12391b0Cbe642aFcFfbda1a79De746Af08969B8",
      constructorArguments:["0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B", "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6"],
      //Path of your main contract.
      contract: "contracts/GeneralMP.sol:GeneralMP",
    });
    await sleep(3000);

};

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});