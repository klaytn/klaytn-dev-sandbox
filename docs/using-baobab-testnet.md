# Using Baobab Testnet

This document explains how to deploy the contracts using Baobab Testnet.

## 1. Prepare a Private Key w/ testnet KLAY

- Obtain testnet KLAY from the [Baobab Faucet](https://baobab.wallet.klaytn.com/faucet).

## 2. Paste Private Key into `.env` file

```bash
cp .env.example .env
```

Then edit .env:

```bash
TESTNET_PRIVATE_KEY=<PrivateKey>
```

## 3. Deploy contracts

```bash
pnpm run deploy:baobab
# or
pnpm run deploy --network baobab
```
