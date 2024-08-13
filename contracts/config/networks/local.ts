import { readFileSync } from "fs";
import { join } from "path";

import type { HardhatUserConfig } from "hardhat/types";

export default function maybeAddLocal(config: HardhatUserConfig) {
  let private_keys_buffer: Buffer;
  try {
    private_keys_buffer = readFileSync(join(__dirname, "../../privateKeys.js"));
  } catch (e) {
    console.error(e);
    return;
  }

  let private_keys;
  try {
    private_keys = JSON.parse(private_keys_buffer.toString());

    if (!(private_keys instanceof Array)) {
      throw new Error("privateKeys is not an array");
    }
  } catch (e) {
    console.error(e);
    return;
  }

  config.networks!.local = {
    accounts: private_keys,
    url: "http://localhost:8551",
  };
}
