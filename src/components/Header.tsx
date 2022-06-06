import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import WalletModal from './WalletModal'
import providerContext from '../context/context'
import Image from 'next/image'
import { DocumentDuplicateIcon } from '@heroicons/react/outline'
import { shortenAddress, shortenBalance } from '../helpers'
import Subheader from './Subheader'
import brandImg from '../public/brandmark.svg'
import { toast } from 'react-toastify'

const Header = () => {
  const {
    web3,
    caver,
    klaytnProvider,
    ethProvider,
    metamaskAddress,
    kaikasAddress,
    currentWallet,
    metamaskCaver,
  } = useContext(providerContext)
  const [walletModal, setWalletModal] = useState<boolean>(false)
  const [metamaskBalance, setMetamaskBalace] = useState<string>()
  const [kaikasBalance, setKaikasBalance] = useState<any>()
  const [metamaskConnected, setMetamaskConnected] = useState<boolean>(false)

  const detectKaikasNetwork = () => {
    if (klaytnProvider) {
      const networkId = klaytnProvider.networkVersion
      if (networkId !== 1001) {
        toast.error('Please connect to the Baobab Testnet to use this sandbox', {
          theme: 'colored',
          autoClose: false,
        })
      }
    }
  }

  const detectMetamaskNetwork = () => {
    if (ethProvider) {
      const networkId = ethProvider.networkVersion
      console.log('network: ', typeof networkId)
      if (networkId !== 1001) {
        toast.error('Please connect to the Baobab Testnet to use this sandbox', {
          theme: 'colored',
          autoClose: false,
        })
      }
    }
  }

  const initMetamaskWallet = async () => {
    const status = ethProvider.isConnected()
    setMetamaskConnected(status)
  }

  const getMetamaskBalance = async () => {
    const balance = await web3.eth.getBalance(metamaskAddress)
    if (balance) {
      const ether = web3.utils.fromWei(balance, 'ether')
      setMetamaskBalace(ether)
    }
  }

  const getKaikasBalance = async () => {
    const balance = await caver.klay.getBalance(kaikasAddress)
    if (balance) {
      const klay = caver.utils.convertFromPeb(balance, 'KLAY')
      setKaikasBalance(klay)
    }
  }

  const getMetamaskCaverBalance = async () => {
    const balance = await metamaskCaver.klay.getBalance(metamaskAddress)
    if (balance) {
      const ether = metamaskCaver.utils.convertFromPeb(balance, 'KLAY')
      setMetamaskBalace(ether)
    }
  }

  useEffect(() => {
    if (metamaskCaver) {
      getMetamaskCaverBalance()
    }
  }, [metamaskCaver])

  useEffect(() => {
    if (ethProvider) {
      initMetamaskWallet()
    }
  }, [ethProvider, metamaskConnected])

  useEffect(() => {
    if (ethProvider && web3) {
      ethProvider.on('networkChanged', function () {
        detectMetamaskNetwork()
      })
      getMetamaskBalance()
    }
  }, [ethProvider, web3])

  useEffect(() => {
    if (klaytnProvider && caver) {
      klaytnProvider.on('networkChanged', function () {
        detectKaikasNetwork()
      })
      getKaikasBalance()
    }
  }, [klaytnProvider, caver, kaikasAddress])

  return (
    <header className="grid grid-rows-2 font-light">
      <div className="flex place-content-between p-3 items-center text-gray-900 bg-gray-100">
        <WalletModal
          walletModal={walletModal}
          setWalletModal={setWalletModal}
          setMetamaskConnected={setMetamaskConnected}
        />
        <Link href="/">
          <a className="mx-5 text-xl">
            <Image src={brandImg} alt="Logo" width="150px" height="35px" />
          </a>
        </Link>
        <ul className="flex items-right">
          <div className="flex justify-center items-center">
            <div className="mx-6 flex">
              {currentWallet === 'Kaikas' && kaikasBalance
                ? shortenBalance(kaikasBalance)
                : metamaskBalance && shortenBalance(metamaskBalance)}{' '}
              KLAY
            </div>
            <li className="mx-6">
              {kaikasAddress && (
                <button
                  className="flex items-center text-gray-600 font-light space-x-4 active:text-emerald-400"
                  onClick={() => {
                    navigator.clipboard.writeText(kaikasAddress)
                  }}
                >
                  {shortenAddress(kaikasAddress)}
                  <DocumentDuplicateIcon
                    className="w-5 h-10 ml-2 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(kaikasAddress)
                    }}
                  />
                </button>
              )}
              {metamaskAddress && (
                <button
                  className="flex items-center text-gray-600 font-light space-x-4 active:text-emerald-400"
                  onClick={() => {
                    navigator.clipboard.writeText(metamaskAddress)
                  }}
                >
                  {shortenAddress(metamaskAddress)}
                  <DocumentDuplicateIcon
                    className="w-5 h-10 ml-2 cursor-pointer active:text-emerald-400"
                    onClick={() => {
                      navigator.clipboard.writeText(metamaskAddress)
                    }}
                  />
                </button>
              )}
              {!metamaskAddress && !kaikasAddress && (
                <button
                  className="border rounded-full px-4 py-2 border-grey bg-white font-light"
                  onClick={() => setWalletModal(true)}
                >
                  Connect
                </button>
              )}
            </li>
          </div>
        </ul>
      </div>
      <Subheader />
    </header>
  )
}

export default Header
