require("@nomicfoundation/hardhat-toolbox");
require("hardhat-contract-sizer");
require("@nomiclabs/hardhat-ethers");
require('@nomiclabs/hardhat-truffle5');
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


module.exports = {
  solidity: {
    compilers: [
      {

        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      }
    ],
  },
  contractSizer: {
    alphaSort: false,
    disambiguatePaths: true,
    runOnCompile: true,
    strict: false
    // only:[':Token']
  },

  networks: {
    hardhat: {
      // gas: 1000000000,
      allowUnlimitedContractSize: true,
      
    },
    mumbaitest: {
      url: `${process.env.MUMBAI_URL}`,
      accounts:[`0x${process.env.PVTKEY}`],

      // gasPrice: 500000000
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    avaxtest:{
      url: `${process.env.AVAXTEST_URL}`,
      accounts:[`0x${process.env.PVTKEY}`],
    },
      goerlitest:{
        url: `${process.env.GOERLI_URL}`,
        accounts:[`0x${process.env.PVTKEY}`],

      },
      sepoliatest:{
        url: `${process.env.SEPOLIA_URL}`,
        accounts:[`0x${process.env.PVTKEY}`],

      },
      zkevmtest:{
        url: `${process.env.ZKEVM}`,
        accounts:[`0x${process.env.PVTKEY}`],

      },

      optimismtest:{
        url: `${process.env.OPT_URL}`,
        accounts:[`0x${process.env.PVTKEY}`],
      },
      onyxtest:{
        url: `${process.env.ONYX_URL}`,
        accounts:[`0x${process.env.PVTKEY}`],
      },

      jpm:{
        url: `${process.env.JPM}`,
        accounts:[`0x${process.env.PVTKEY}`],
      }
  //     bsctestnet: {
  //       url: 'https://data-seed-prebsc-2-s2.binance.org:8545/',
  //       // url: 'https://bsc.getblock.io/testnet/?api_key=d403c2b8-b4ec-4262-a3f6-dbf41ec3f7e8',
  //       // url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  //       // url: 'https://testnet:7565yFyAhq62txj7jz%y%JG2*6%n52@apis-sj.ankr.com/2182b395b1c942db86304c7729eb61d4/e3de1a44c64a0d87fe1b034d57f5061a/binance/full/test' ,
  //       accounts: [`0x${process.env.PVTKEY}`],
  //       // gasPrice: 500000000
  //     },
  // //     bscmainnet: {
  // //       url: 'https://bsc-dataseed1.defibit.io/',
  // //       accounts: [`0x${process.env.PVTKEY}`],
  // //     }
  },
  etherscan: {
    // apiKey: `${process.env.ETH_API}`,
    apiKey: {
      goerli:`${process.env.ETH_API}`,
      sepolia: `${process.env.ETH_API}`,
      avalancheFujiTestnet: `${process.env.AVAX_API}`,
      polygonMumbai: `${process.env.MUMBAI_API}`,
      optimisticGoerli: `${process.env.OPT_API}`
    }
  },

};