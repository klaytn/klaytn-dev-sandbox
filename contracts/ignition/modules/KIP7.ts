import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DEFAULT_NAME = "Name";
const DEFAULT_SYMBOL = "SYM";
const DEFAULT_INITIAL_SUPPLY = 1_000_000_000n;

const KIP7Module = buildModule("KIP7Module", function (m) {
  const name = m.getParameter("name", DEFAULT_NAME);
  const symbol = m.getParameter("symbol", DEFAULT_SYMBOL);
  const initialSupply = m.getParameter("initialSupply", DEFAULT_INITIAL_SUPPLY);

  const kip7token = m.contract("KIP7Token", [name, symbol, initialSupply]);

  return { kip7token };
});

export default KIP7Module;
