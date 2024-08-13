import type { HardhatUserConfig } from "hardhat/types";

export default function maybeAddCypress(config: HardhatUserConfig) {
  if (process.env.MAINNET_API_URL && process.env.MAINNET_PRIVATE_KEY) {
    config.networks!.cypress = {
      accounts: [process.env.MAINNET_PRIVATE_KEY],
      chainId: 8217,
      url: process.env.MAINNET_API_URL,
    };
  }
}
