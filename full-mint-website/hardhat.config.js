require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-solhint");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity:{
    compilers:[{version:"0.8.0"},{version:"0.8.4"}]
  },
 

  networks:{ 
    
    
    goerli:{
      url:process.env.GOERLI_RPC_URL,
      chainId:5,
      accounts:[process.env.GOERLI_WALLET]
    },

    localhost:{ 
      url:"http://127.0.0.1:8545/",
      chainId:31337,
      accounts:[process.env.FORKED_MAINNET_WALLET]

    }
  },

  etherscan:{
    apiKey: process.env.ETHERSCAN_API_KEY,
  }

  
};
