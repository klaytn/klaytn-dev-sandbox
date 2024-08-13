# Using Local Klaytn Node

This document explains how to run a local Klaytn node & host this repository using the node.

## 1. Start the node

```bash
cd contracts/ # from root directory
pnpm run run:local
```

## 2. Compile & Deploy contracts

```bash
pnpm run compile
pnpm run deploy:local
```

## 3. Build the frontend

```bash
cd frontend/ # from root directory
pnpm run build
```

## 4. Start the frontend

```bash
pnpm run start
```
