const fs = require('fs')
const Caver = require('caver-js')
const path = require('path')
const url = 'http://localhost:8551'
const caver = new Caver(url)

async function initAccounts(numAccounts) {
  caver.rpc.klay.getAccounts(async function (err, result) {
    var fundAddr = result[0]
    var privateKeys = []

    for (var i = 0; i < numAccounts; i++) {
      const p = caver.wallet.keyring.generate()
      privateKeys.push(p.key.privateKey)

      const vt = caver.transaction.valueTransfer.create({
        from: fundAddr,
        to: p.address,
        value: caver.utils.toPeb(100, 'KLAY'),
        gas: 25000,
      })

      const signed = await caver.rpc.klay.signTransaction(vt)
      const receipt = await caver.rpc.klay.sendRawTransaction(signed.raw)
    }

    fs.writeFileSync(path.join(__dirname, '../privateKeys.js'), JSON.stringify(privateKeys))
    console.log('Account initialized successfully.')
  })
}

initAccounts(10)
