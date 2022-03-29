# Klaytn Dev Sandbox

This repository contains Boilerplate code for front-end(UI) and contracts(backend) that are helpful to building blockchain applications on Klaytn.

Some files were derived from [openzeppelin contracts v2.3.0](https://github.com/OpenZeppelin/openzeppelin-contracts/releases/tag/v2.3.0).

## Prerequisites

The following packages should be installed before using this source code.

- git
- docker (Docker should be running in the background)
- Node v10.21.0
- Truffle v5.1.61
- jq (https://stedolan.github.io/jq/)

## Package Installation

Please install node packages first.

```bash
$ npm install
$ npm install -g truffle@v5.1.61
```

## Running a Local Klaytn Network

You can easily deploy a local Klaytn network via the following command:

```bash
$ npm run run:klaytn
```

To see the execution logs, run `npm run run:klaytn:log`.
To stop the network, run `npm run run:klaytn:stop`.
To resume the network, run `npm run run:klaytn:resume`.
To completely terminate the network, run `npm run run:klaytn:terminate`.
To remove log files, run `npm run run:klaytn:cleanlog`.

# Deploying Contracts

## Deploying a contract to the local network

1. To deploy a contract, execute any one of the following command to deploy the local network.

Deploy KIP-7 contract

```bash
$ npm run deploy:klaytn:kip7
```

Deploy KIP-17 contract

```bash
$ npm run deploy:klaytn:kip17
```

Deploy kip37 contract

```bash
$ npm run deploy:klaytn:kip37
```

## Deploying a contract to Baobab Testnet

Update `privateKey` and `URL` in .env file for test network `baobab` of [truffle-config.js](./truffle-config.js).

```js
    baobab: {
      provider: () => {
        return new HDWalletProvider(privateKey, testnetApiUrl);
      },
      network_id: '1001', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice: null
    },
```

```bash
$ npm run deploy:baobab:<contractname>
```

## Run the Frontend

Starting from the root folder, run the following:

```bash
cd src
npm install
npm run dev
```

## Want to Contribute to Klaytn Dev Sandbox? <a id="want-to-contribute"></a>

In line with our commitment to decentralization, all Klaytn codebase and its documentations are completely open source. Klaytn always welcomes your contribution. Anyone can view, edit, fix its contents and make suggestions. You can either create a pull request on GitHub or use GitBook. Make sure to sign our [Contributor License Agreement (CLA)](https://cla-assistant.io/klaytn/klaytn-dev-sandbox) first and there are also a few guidelines our contributors would check out before contributing:

- [Contribution Guide](./CONTRIBUTING.md)
- [License](./LICENSE)
- [Code of Conducts](./code-of-conduct.md)

## Need Help? <a href="#need-help" id="need-help"></a>

If you have any questions, please visit our [Gitter channel](https://gitter.im/klaytn/klaytn-dev-sandbox?utm_source=share-link&utm_medium=link&utm_campaign=share-link), [Klaytn Developers Forum](https://forum.klaytn.com/) and [Discord channel](https://discord.gg/mWsHFqN5Zf).