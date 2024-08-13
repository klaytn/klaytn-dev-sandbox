# Deploying specific contracts

This guide will help you deploy specific contracts from the `contracts` directory.

## 1. `cd` into the `contracts` directory

```bash
cd contracts/ # from root directory
```

## 2. Specify the `--contracts` argument

E.g.,

```bash
# single contract
pnpm run deploy --contracts kip7
pnpm run deploy --contracts kip17
pnpm run deploy --contracts kip37

# comma-separated list
pnpm run deploy --contracts kip7,kip17
pnpm run deploy --contracts kip7,kip37
```

## Use `deploy --help` or `help:deploy` for more information

```bash
pnpm run deploy --help
pnpm run help:deploy
```
