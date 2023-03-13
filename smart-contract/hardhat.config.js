
require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

//** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.7",
  networks:{
    goerli:{
      url:'https://eth-goerli.g.alchemy.com/v2/6l8B3FdtNUIBfI92wStg45gpGx7Ef6a5', 
      accounts: ["e38ebddf0dd85157ef6af30f6a1304f9ce962f1064c7cf5bbef2cb2cd26b0966"]
    }
  },

};
