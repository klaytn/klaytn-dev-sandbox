import { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import providerContext from '../context/context'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import Web3 from 'web3'
import Caver from 'caver-js'
import 'react-toastify/dist/ReactToastify.css'

interface ModalProps {
  walletModal: boolean
  setWalletModal: (a: boolean) => void
  setMetamaskConnected: (a: boolean) => void
}

const connectKaikas = async (state: any) => {
  try {
    const accounts = await state.klaytnProvider.enable()
    state.setKaikasAddress(accounts[0])
    const caver = new Caver(state.klaytnProvider)
    state.setCaver(caver)
    state.setCurrentWallet('Kaikas')
    localStorage.setItem('currentWallet', 'kaikas')
    if (state.props) {
      state.props.setWalletModal(false)
    }
    const networkId = state.klaytnProvider.networkVersion
    state.klaytnProvider.on('accountsChanged', () => {
      state.setKaikasAddress(state.klaytnProvider.selectedAddress)
    })
    if (networkId !== 1001) {
      toast.error('Please connect to the Baobab Testnet to use this sandbox', {
        theme: 'colored',
        autoClose: false,
      })
    } else {
      toast.success('Wallet Connected', { theme: 'colored', autoClose: 2000 })
    }
  } catch (error: any) {
    console.error(error.message)
    localStorage.setItem('currentWallet', '')
    toast.error(error.message, { theme: 'colored' })
  }
}

const connectMetamask = async (state: any) => {
  try {
    const account = await state.ethProvider.request({ method: 'eth_requestAccounts' })
    state.setMetamaskAddress(account[0])
    let web3 = new Web3(state.ethProvider)
    state.setWeb3(web3)
    state.setCurrentWallet('Metamask')
    localStorage.setItem('currentWallet', 'metamask')
    if (state.props) {
      state.props.setWalletModal(false)
    }
    const networkId = state.ethProvider.networkVersion
    state.ethProvider.on('accountsChanged', () => {
      state.setMetamaskAddress(state.ethProvider.selectedAddress)
    })
    if (networkId !== '1001') {
      toast.error('Please connect to the Baobab Testnet to use this sandbox', {
        theme: 'colored',
        autoClose: false,
      })
    } else {
      toast.success('Wallet Connected', { theme: 'colored', autoClose: 2000 })
    }
  } catch (error: any) {
    console.error(error.message)
    localStorage.setItem('currentWallet', '')
    toast.error(error.message, { theme: 'colored' })
  }
}

const WalletModal = (props: ModalProps) => {
  const {
    ethProvider,
    klaytnProvider,
    setMetamaskAddress,
    setKaikasAddress,
    setWeb3,
    setCaver,
    setCurrentWallet,
  } = useContext(providerContext)

  const state = {
    ethProvider,
    klaytnProvider,
    setMetamaskAddress,
    setKaikasAddress,
    setWeb3,
    setCaver,
    setCurrentWallet,
    props,
  }

  return (
    <>
      <Transition appear show={props.walletModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => props.setWalletModal(false)}
        >
          <div className="absolute bg-black opacity-70 inset-0 z-0"></div>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-70"
              leave="ease-in duration-200"
              leaveFrom="opacity-70"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block font-light w-1/2 max-w-md p-6 my-12 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-3xl font-light leading-6 text-gray-900 flex justify-center"
                >
                  Select Wallet
                </Dialog.Title>
                <div className="grid grid-cols-2 p-6">
                  <div
                    className="hover:border-2 hover:border-slate-200 border-2 border-white cursor-pointer p-4 rounded-md flex justify-center"
                    onClick={() => connectKaikas(state)}
                  >
                    <div>
                      <Image src="/kaikas.jpeg" width="100px" height="100px" />
                      <p className="text-center text-xl">Kaikas</p>
                    </div>
                  </div>
                  <div
                    className="hover:border-2 hover:border-slate-200 border-2 border-white cursor-pointer p-4 rounded-md flex justify-center"
                    onClick={() => connectMetamask(state)}
                    // onClick={connectMetamaskWithCaver}
                  >
                    <div>
                      <Image src="/metamask.png" width="100px" height="100px" />
                      <p className="text-center text-xl">Metamask</p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default WalletModal
export { connectKaikas, connectMetamask }
