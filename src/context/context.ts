import { createContext } from 'react'

interface context {
  klaytnProvider: any
  ethProvider: any
  metamaskAddress: any
  kaikasAddress: any
  web3: any
  caver: any
  currentWallet: any
  metamaskCaver: any
  setKlaytnProvider: (a: any) => void
  setEthProvider: (a: any) => void
  setMetamaskAddress: (a: any) => void
  setKaikasAddress: (a: any) => void
  setWeb3: (a: any) => void
  setCaver: (a: any) => void
  setCurrentWallet: (a: any) => void
  setMetamaskCaver: (a: any) => void
}

const contextDefaultValue = {
  klaytnProvider: null,
  ethProvider: null,
  metamaskAddress: null,
  kaikasAddress: null,
  web3: null,
  caver: null,
  currentWallet: null,
  metamaskCaver: null,
  setKlaytnProvider: (a: any) => null,
  setEthProvider: (a: any) => null,
  setMetamaskAddress: (a: any) => null,
  setKaikasAddress: (a: any) => null,
  setWeb3: (a: any) => null,
  setCaver: (a: any) => null,
  setCurrentWallet: (a: any) => null,
  setMetamaskCaver: (a: any) => null

}

const context = createContext<context>(contextDefaultValue)

export default context
