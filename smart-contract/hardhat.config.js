
require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

//** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.7",
  networks:{
    goerli:{
      url:'NETWORK_API', 
      accounts: ["PRIVATE_KEY"]
    }
  },

};
