import { task, types } from "hardhat/config";
import { mkdirSync, writeFile } from "fs";
import { resolve, join } from "path";

import type {
  IgnitionModule,
  IgnitionModuleResult,
} from "@nomicfoundation/ignition-core/dist/src/types/module";
import type { HardhatRuntimeEnvironment } from "hardhat/types";

import KIP7Module from "../../ignition/modules/KIP7";
import KIP17Module from "../../ignition/modules/KIP17";
import KIP37Module from "../../ignition/modules/KIP37";
import parameters from "../../ignition/parameters.json";

const deployed_dir = resolve(join(__dirname, "../../../frontend/deployed/"));

task("deploy", "Deploy contract(s)")
  .addParam(
    "contracts",
    "Comma-separated list of contracts to deploy (kip7,kip17,kip37)",
    "kip7,kip17,kip37",
    types.string
  )
  .setAction(async function (task_args, hre) {
    const parsed_contracts = task_args.contracts.split(",").filter(Boolean);
    if (parsed_contracts.length === 0) {
      throw Error("No contracts specified");
    }
    // TODO: ? handle duplicates
    console.log(`Deploying contract(s): ${parsed_contracts.join(", ")}`);

    try {
      mkdirSync(deployed_dir, { recursive: true });
      console.log(`Created directory: ${deployed_dir}`);
    } catch (e) {
      console.error(e);
      throw Error(`Failed to create directory: ${deployed_dir}`);
    }

    for (const contract of parsed_contracts) {
      switch (contract) {
        case "kip7":
          await deployKip7(hre);
          break;
        case "kip17":
          await deployKip17(hre);
          break;
        case "kip37":
          await deployKip37(hre);
          break;
        default:
          throw Error(`Unknown contract type: ${contract}`);
      }
    }
  });

async function deploy<ContractNameT extends string>(
  hre: HardhatRuntimeEnvironment,
  Module: IgnitionModule<string, ContractNameT, IgnitionModuleResult<ContractNameT>>,
  contract_name: ContractNameT,
  deployed_prefix: string,
  artifact_name: string
) {
  const deployment = await hre.ignition.deploy(Module, { parameters });

  const address = await deployment[contract_name].getAddress();
  writeFile(join(deployed_dir, `${deployed_prefix}TokenAddress`), address, function (e) {
    if (e) {
      console.error(e);
      throw Error("Failed to write address");
    }
  });

  const artifact = await hre.artifacts.readArtifact(artifact_name);
  writeFile(
    join(deployed_dir, `${deployed_prefix}TokenABI.json`),
    JSON.stringify(artifact.abi, null, 2),
    function (e) {
      if (e) {
        console.error(e);
        throw Error("Failed to write ABI");
      }
    }
  );
}

function deployKip7(hre: HardhatRuntimeEnvironment) {
  return deploy(
    hre,
    KIP7Module,
    "kip7token",
    "kip7",
    "contracts/token/KIP7/KIP7Token.sol:KIP7Token"
  );
}

function deployKip17(hre: HardhatRuntimeEnvironment) {
  return deploy(
    hre,
    KIP17Module,
    "kip17token",
    "kip17",
    "contracts/token/KIP17/KIP17Token.sol:KIP17Token"
  );
}

function deployKip37(hre: HardhatRuntimeEnvironment) {
  return deploy(
    hre,
    KIP37Module,
    "kip37token",
    "kip37",
    "contracts/token/KIP37/KIP37Token.sol:KIP37Token"
  );
}
