import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DEFAULT_NAME = "Name";
const DEFAULT_SYMBOL = "SYM";
const DEFAULT_BASE_URI = "";

const KIP17Module = buildModule("KIP17Module", function (m) {
  const name = m.getParameter("name", DEFAULT_NAME);
  const symbol = m.getParameter("symbol", DEFAULT_SYMBOL);

  const kip17token = m.contract("KIP17Token", [name, symbol]);

  const base_uri = m.getParameter("baseuri", DEFAULT_BASE_URI);
  if (base_uri) {
    m.call(kip17token, "setBaseURI", [DEFAULT_BASE_URI]);
  }

  return { kip17token };
});

export default KIP17Module;
