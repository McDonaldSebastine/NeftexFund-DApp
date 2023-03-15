
require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

//** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.7",
  networks:{
    goerli:{
      url:'NETWORK_API', //input your Goerli API
      accounts: ["PRIVATE_KEY"] //input your wallet private key ex. metamask wallet private key
    }
  },

};
