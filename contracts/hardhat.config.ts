import "dotenv/config";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import "./config/tasks";
import maybeAddNetworks from "./config/networks";

const config: HardhatUserConfig = {
  networks: {},
  solidity: "0.8.24",
};

maybeAddNetworks(config);

export default config;
