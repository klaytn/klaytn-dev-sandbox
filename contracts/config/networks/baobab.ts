import type { HardhatUserConfig } from "hardhat/types";

export default function maybeAddBaobab(config: HardhatUserConfig) {
  if (process.env.TESTNET_API_URL && process.env.TESTNET_PRIVATE_KEY) {
    config.networks!.baobab = {
      accounts: [process.env.TESTNET_PRIVATE_KEY],
      chainId: 1001,
      url: process.env.TESTNET_API_URL,
    };
  }
}
