const fs = require('fs')
var kip7Token = artifacts.require('KIP7Token')
const BigNumber = require('bignumber.js')

module.exports = function (deployer) {
  deployer.deploy(kip7Token, 'TestToken', 'TST', BigNumber('100000000000000000000000')).then(() => {
    // Record recently deployed contract address to 'deployedAddress' file.
    if (kip7Token._json) {
      fs.mkdir('../frontend/deployed', { recursive: true }, (err) => {
        if (err) throw err
      })
      // Save abi file to deployedABI.
      fs.writeFile(
        '../frontend/deployed/kip7TokenABI',
        JSON.stringify(kip7Token._json.abi, 2),
        (err) => {
          if (err) throw err
          console.log(`The abi of ${kip7Token._json.contractName} is recorded on deployedABI file`)
        }
      )
    }
    fs.writeFile('../frontend/deployed/kip7TokenAddress', kip7Token.address, (err) => {
      if (err) throw err
      console.log(
        `The deployed contract address * ${kip7Token.address} * is recorded on deployedAddress file`
      )
    })
  })
}
