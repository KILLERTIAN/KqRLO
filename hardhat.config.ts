import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    xlayerTestnet: {
      url: "https://testrpc.xlayer.tech",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      xlayerTestnet: "your-api-key" // Optional for verification
    },
    customChains: [
      {
        network: "xlayerTestnet",
        chainId: 195,
        urls: {
          apiURL: "https://www.okx.com/web3/explorer/xlayer-test/api",
          browserURL: "https://www.okx.com/web3/explorer/xlayer-test"
        }
      }
    ]
  }
};

export default config;
