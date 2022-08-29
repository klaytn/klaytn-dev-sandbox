# Klaytn Dev Sandbox

This repository contains Boilerplate code for front-end(UI) and contracts(backend) that are helpful to building blockchain applications on Klaytn.

It imports [klaytn-contract library](https://github.com/klaytn/klaytn-contracts/tree/master/contracts) to create a KIP7, KIP17 and KIP37 token. 

## Prerequisites

The following packages should be installed before using this source code.

- git
- docker (Docker should be running in the background)
- Node v16.14.0 or above
- Truffle v5.5.7
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

Note : We found issues running local network in windows. Please refer to the [Issue](https://github.com/klaytn/klaytn-dev-sandbox/issues/44). 
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
Make sure you rename the `.env.example` to `.env` before you proceed. 

You can deploy to Baobab using a public rpc endpoint or subscribing to [Klaytn API Service](https://console.klaytnapi.com/en/auth/signup) and using kas endpoint 

### Connecting to Baobab via KAS (Klaytn API Service)

Refer to this [documentation](https://docs.klaytnapi.com/v/en/getting-started/get-ready) to signup KAS and get the accessKey, secretKey and rpc endpoint. Update .env file with `ACCESS_KEY_ID`, `SECRET_ACCESS_KEY`and `KAS_TESTNET_API_URL` 

Go ahead and deploy the KIP contracts with the below config 

```truffle-config.js
kasBaobab: {
      provider: () => {
        const option = {
          headers: [
            { name: 'Authorization', value: 'Basic ' + Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64') },
            { name: 'x-chain-id', value: '1001' }
          ],
          keepAlive: false,
        }
        return new HDWalletProvider(baobabPrivateKey, new Caver.providers.HttpProvider(kasTestnetApiUrl, option))
      },
      network_id: '1001', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice:'750000000000'
    }
```

```bash
$ npm run deploy:kasBaobab:<contractname> 
```

### Connecting to Baobab via Public RPC endpoint
Update `privateKey` and `URL` in .env file for test network `baobab` of [truffle-config.js](./truffle-config.js).

You can export the `privateKey` from kaikas wallet and `URL` from the klaytn [docs](https://docs.klaytn.foundation/dapp/json-rpc/public-en)

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
cp .env.local.example .env.local
```
Register in Infura https://infura.io/dashboard and create an IPFS project to get a `IPFS_PROJECT_KEY` and `IPFS_PROJECT_SECRET` to store images in public ipfs nodes. We use ipfs to store our NFT metadeta. Read more about ipfs https://docs.infura.io/infura/networks/ipfs. 

Paste the key and secret in .env.local file to run the frontend. 

```bash
npm install
npm run dev
```
Note: The current version of frontend does not communicate with the local network. It only interacts with the contracts deployed in baobab network. It will release in the future versions.

### Troubleshooot
Issue : Error: Private keys file has not been downloaded to the local directory! Follow the troubleshooting steps to proceed

1. To make sure the network is running 

    ```
    $ lsof -i :8551
    COMMAND    PID      USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
    com.docke 5371      xxx  134u  IPv6 0xd988cab51d5e3b71      0t0  TCP *:8551 (LISTEN)
    ```
if the network is not running then execute ```npm run run:klaytn``` and start the local network 

2. Check whether privateKeys.js file is available in your root folder. If not, execute the below command

    ```npm run run:klaytn:createAccounts```


## Want to Contribute to Klaytn Dev Sandbox? <a id="want-to-contribute"></a>

In line with our commitment to decentralization, all Klaytn codebase and its documentations are completely open source. Klaytn always welcomes your contribution. Anyone can view, edit, fix its contents and make suggestions. You can either create a pull request on GitHub or use GitBook. Make sure to sign our [Contributor License Agreement (CLA)](https://cla-assistant.io/klaytn/klaytn-dev-sandbox) first and there are also a few guidelines our contributors would check out before contributing:

- [Contribution Guide](./CONTRIBUTING.md)
- [License](./LICENSE)
- [Code of Conducts](./code-of-conduct.md)

## Need Help? <a href="#need-help" id="need-help"></a>

If you have any questions, please visit our [Gitter channel](https://gitter.im/klaytn/klaytn-dev-sandbox?utm_source=share-link&utm_medium=link&utm_campaign=share-link), [Klaytn Developers Forum](https://forum.klaytn.com/) and [Discord channel](https://discord.gg/mWsHFqN5Zf).