import type { HardhatUserConfig } from "hardhat/types";

import maybeAddLocal from "./local";
import maybeAddBaobab from "./baobab";
import maybeAddCypress from "./cypress";
import maybeAddKas from "./kas";

export default function maybeAddNetworks(config: HardhatUserConfig) {
  maybeAddLocal(config);
  maybeAddBaobab(config);
  maybeAddCypress(config);
  maybeAddKas(config);
}
