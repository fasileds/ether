/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = "cd5cdc6126174201b2c3fbed462d91a9f131a0a764401a80379226bb4dda6e2f";
const RPC_URL = "https://rpc.sepolia.org";
module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
      chainId: 4664123,
    },
    sepolia: {
      url: "https://rpc.sepolia.org",
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
