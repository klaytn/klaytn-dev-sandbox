import { JsonRpcProvider, Wallet, parseEther } from "ethers";

import fs from "fs";
import path from "path";

const url = "http://localhost:8551";
const provider = new JsonRpcProvider(url);

async function initAccounts(num_accounts: number) {
  const signers = await provider.listAccounts();
  const fund_signer = signers[0];
  const private_keys = [];

  for (let i = 0; i < num_accounts; i++) {
    const wallet = Wallet.createRandom();
    private_keys.push(wallet.privateKey);
    try {
      const tx = await fund_signer.sendTransaction({
        to: wallet.address,
        value: parseEther("100"),
      });
      await tx.wait();
    } catch (e) {
      console.error(e);
      return;
    }
  }

  fs.writeFileSync(path.join(__dirname, "../privateKeys.js"), JSON.stringify(private_keys));
  console.log("Account initialized successfully.");
}

initAccounts(10);
