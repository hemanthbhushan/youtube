const Hre = require("hardhat");
const BN = require("ethers").BigNumber;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function main() {

    await Hre.run("verify:verify", {
      //Deployed contract Token address
      address: "0xB3D3817B98e515054eFb008Bba4879Ec2eD0974f",
      constructorArguments:["0x4D147dCb984e6affEEC47e44293DA442580A3Ec0", "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6"],
      //Path of your main contract.
      contract: "contracts/TwoWayMP.sol:TwoWayMP",
    });
    await sleep(3000);

};

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});