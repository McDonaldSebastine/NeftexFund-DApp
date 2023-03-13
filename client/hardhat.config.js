
require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

//** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: ">=0.4.16 <0.9.0",
  networks:{
    goerli:{
      url:'https://eth-goerli.g.alchemy.com/v2/6l8B3FdtNUIBfI92wStg45gpGx7Ef6a5', 
      accounts: ["0x${process.env.PRIVATE_KEY}"]
    }
  },

};
