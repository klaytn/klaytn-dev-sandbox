# klaytn-starter-kit

This repository contains Boilerplate code for front-end(UI) and contracts(backend) that are helpful to building blockchain applications on Klaytn.

Some files were derived from [openzeppelin contracts v2.3.0](https://github.com/OpenZeppelin/openzeppelin-contracts/releases/tag/v2.3.0).

# Prerequisites

The following packages should be installed before using this source code.

* git
* docker (Docker should be running in the background)
* Node v10.21.0
* Truffle v5.1.61
* jq (https://stedolan.github.io/jq/)

# Package Installation

Please install node packages first.

```bash
$ npm install
$ npm install -g truffle@v5.1.61
```

# How to run a Local Klaytn Network

You can easily deploy a local Klaytn network via the following command:

```bash
$ npm run run:klaytn
```

To see the execution logs, run `npm run run:klaytn:log`.
To stop the network, run `npm run run:klaytn:stop`.
To resume the network, run `npm run run:klaytn:resume`.
To completely terminate the network, run `npm run run:klaytn:terminate`.
To remove log files, run `npm run run:klaytn:cleanlog`.

# How to Deploy Contracts


## Deploying a contract to the local network

1. To deploy a contract, please modify [2_contract_migration.js](./contracts/migrations/2_contract_migration.js). The file deploys a KIP7 contract.
2. To deploy additional contracts add migrations file [3_contract_migration.js] similar to [2_contract_migration.js] to deploy additional contracts
3. Execute the following command to deploy the local network.

```bash
$ npm run deploy:klaytn
```

## Deploying a contract to Baobab

```bash
$ npm run deploy:baobab
```

### Using an EN

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

### Using KAS

Also, you can use [KAS](http://www.klaytnapi.com) instead of your local Node. Please refer to `kasBaobab` as shown below.
In this case, you need to update `privateKey`, `accessKeyId`, and `secretAccessKey` in .env file .

**NOTE**: As of Feb 2021, "Using KAS" is not supported yet.

```js
...
    kasBaobab: {
      provider: () => {
        const option = {
          headers: [
            { name: 'Authorization', value: 'Basic ' + Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64') },
            { name: 'x-chain-id', value: '1001' }
          ],
          keepAlive: false,
        }
        return new HDWalletProvider(privateKey, new Caver.providers.HttpProvider(kasTestnetApiUrl, option))
      },
      network_id: '1001', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice:'25000000000'
    },
```

# Create a UI 

/frontend is the boiler plate code to create UI for the contract. This code can be modified to play around with.
Once the contracts are deployed the contract ABI and deployed contract address is written to file under 
/frontend/deployed folder  

```
dev
├── backend
├── frontend
```