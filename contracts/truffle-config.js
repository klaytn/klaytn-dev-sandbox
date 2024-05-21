/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const infuraKey = "fj4jll3k.....";
//
const fs = require('fs');
const path = require("path");
const Caver = require('caver-js')
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

require('dotenv').config();

const accessKeyId = process.env.ACCESS_KEY_ID;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const cypressPrivateKey = process.env.MAINNET_PRIVATE_KEY;
const baobabPrivateKey = process.env.TESTNET_PRIVATE_KEY;
const testnetApiUrl = process.env.TESTNET_API_URL;
const kasTestnetApiUrl = process.env.KAS_TESTNET_API_URL;
const mainnetApiUrl = process.env.MAINNET_API_URL;
const kasMainnetApiUrl = process.env.KAS_MAINNET_API_URL;

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    // for ganache
    // development: {
    //   host: "127.0.0.1",     // Localhost (default: none)
    //   port: 8545,            // Standard Ethereum port (default: none)
    //   network_id: "*",       // Any network (default: none)
    //   gas: 80000000
    // },
    
    klaytn: {
      provider: () => {
        const file = path.resolve(__dirname)+'/privateKeys.js';
        fs.access(file, fs.F_OK, (err) => {
          if (err) {
            console.error("Error: Private keys file has not been downloaded to the local directory! Follow the troubleshooting guide in Readme to proceed")
            return
          }
        })
        const pks = JSON.parse(fs.readFileSync(file))
        return new HDWalletProvider(pks, "http://localhost:8551", 0, pks.length)
      },
      network_id: '203', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice: null
    },
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
      gasPrice:'250000000000'
    },
    kasCypress: {
      provider: () => {
        const option = {
          headers: [
            { name: 'Authorization', value: 'Basic ' + Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64') },
            { name: 'x-chain-id', value: '8217' }
          ],
          keepAlive: false,
        }
        return new HDWalletProvider(cypressPrivateKey, new Caver.providers.HttpProvider(kasMainnetApiUrl, option))
      },
      network_id: '8217', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice:'750000000000'
    },
    baobab: {
      provider: () => { return new HDWalletProvider(baobabPrivateKey, testnetApiUrl) },
      network_id: '1001', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice: null,
      timeoutBlocks: 400000,
      networkCheckTimeout: 400000
    },
    cypress: {
      provider: () => { return new HDWalletProvider(cypressPrivateKey, mainnetApiUrl) },
      network_id: '8217', //Klaytn mainnet's network id
      gas: '8500000',
      gasPrice: null
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "constantinople"
      }
    }
  }
}