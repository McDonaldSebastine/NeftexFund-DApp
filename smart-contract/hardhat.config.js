require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config({ path: '.env' })
require('@nomiclabs/hardhat-etherscan')



const { POLYGONSCAN_KEY, PRIVATE_KEY} = process.env

module.exports = {
  solidity: '0.8.7',
  // networks for deploying the smart contract
  networks: {
    // polygon testnet
    mumbai: {
      url: "https://rpc.ankr.com/polygon_mumbai",
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_KEY,
    },
  },
}
