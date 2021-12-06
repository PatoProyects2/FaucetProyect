const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

module.exports = {
  
  networks: {
    
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNENOMIC,
          "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY
        ),
      network_id: 3,
      gas: 5500000, 
      confirmations: 1,
      timeoutBlocks: 200,
      skipDryRun: true, 
    },

    bscMainnet: { 
      provider: () =>
        new HDWalletProvider(
          process.env.MNENOMIC,
          "https://bsc-dataseed.binance.org/"
        ),  
      network_id: 56, 
      confirmations: 1,
      timeoutBlocks: 900, 
      networkCheckTimeout: 999999,
      skipDryRun: true, 
    },

    bscTestnet: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNENOMIC,
          "https://data-seed-prebsc-1-s1.binance.org:8545/"
        ),
      network_id: 97, 
      confirmations: 1,
      timeoutBlocks: 1000, 
      networkCheckTimeout: 999999,
      skipDryRun: true, 
    },
    matic: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, 
      "https://polygon-rpc.com"),
      network_id: 137,
      confirmations: 1,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 6000000,
      gasPrice: 10000000000,
    },

  },

  plugins: [
    'truffle-plugin-verify'
 ],
 api_keys: {
    // etherscan: process.env.ETH_SCAN_API_KEY
    bscscan: process.env.BSC_SCAN_API_KEY
 },

  compilers: {
    solc: {
      version: "0.8.0", 
      // docker: true,       
      settings: {        
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "byzantium"
       }
    },
  },
};
