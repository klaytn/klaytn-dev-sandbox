import type { HardhatUserConfig } from "hardhat/types";

const KAS_NODE_API_URL = "https://node-api.klaytnapi.com/v1/klaytn";

export default function maybeAddKas(config: HardhatUserConfig) {
  if (process.env.KAS_ACCESS_KEY_ID && process.env.KAS_SECRET_ACCESS_KEY) {
    const authorization_header =
      "Basic " +
      Buffer.from(process.env.KAS_ACCESS_KEY_ID + ":" + process.env.KAS_SECRET_ACCESS_KEY).toString(
        "base64"
      );

    if (process.env.TESTNET_PRIVATE_KEY) {
      config.networks!.kasBaobab = {
        accounts: [process.env.TESTNET_PRIVATE_KEY],
        chainId: 1001,
        httpHeaders: {
          "Authorization": authorization_header,
          "x-chain-id": "1001",
        },
        url: KAS_NODE_API_URL,
      };
    }

    if (process.env.MAINNET_PRIVATE_KEY) {
      config.networks!.kasMainnet = {
        accounts: [process.env.MAINNET_PRIVATE_KEY],
        chainId: 8217,
        httpHeaders: {
          "Authorization": authorization_header,
          "x-chain-id": "8217",
        },
        url: KAS_NODE_API_URL,
      };
    }
  }
}
