import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const KIP37Module = buildModule("KIP37Module", function (m) {
  const kip37token = m.contract("KIP37Token");

  return { kip37token };
});

export default KIP37Module;
