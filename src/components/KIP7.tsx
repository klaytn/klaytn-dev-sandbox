import { useForm } from 'react-hook-form'
import { useState, useEffect, useContext } from 'react'
import providerContext from '../context/context'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { shortenAddress, shortenBalance, validateAddress } from '../helpers'
import HowToModal from './HowToModal'
//import 'flowbite'
import { Button, Tooltip } from 'flowbite-react'

type FormData = {
  receivingAddress: string
  sendValue: string
}

interface props {
  kip7: any
}

const KIP7 = ({ kip7 }: props) => {
  const { caver, metamaskAddress, kaikasAddress } = useContext(providerContext)
  const [kip7Balance, setKip7Balance] = useState()
  const [tokenSymbol, setTokenSymbol] = useState()
  const [connectedAddress, setConnectedAddress] = useState()
  const [isModalHidden, setIsModalHidden] = useState(false)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>()

  const getWalletBalance = async () => {
    const userBalance = await kip7.methods.balanceOf(connectedAddress).call()
    setKip7Balance(userBalance)
  }

  const getTokenInfo = async () => {
    const symbol = await kip7.methods.symbol().call()
    setTokenSymbol(symbol)
  }

  const transferTokens = async () => {
    const receiver = getValues('receivingAddress')
    const sendValue = getValues('sendValue')
    const gasPrice = await caver.klay.getGasPrice()
    const id = toast.loading('Sending Tokens....', { theme: 'colored' })
    try {
      const txn = await kip7.methods
        .transfer(receiver, sendValue)
        .send({ from: connectedAddress, gasPrice: gasPrice, gas: '0xF4240' })
      console.log('successfully sent tokens: ', txn)
      toast.update(id, {
        render: 'Tokens sent successfully',
        type: 'success',
        autoClose: 3000,
        isLoading: false,
      })
    } catch (err: any) {
      console.error(err)
      toast.update(id, {
        render: err.message,
        type: 'error',
        autoClose: 3000,
        isLoading: false,
      })
    }
  }

  const validateValue = (input: any) => {
    if (kip7Balance && input > kip7Balance) {
      return false
    } else {
      return true
    }
  }

  const showInstruction = () => {
    setIsModalHidden(true)
  }

  useEffect(() => {
    if (kaikasAddress) {
      setConnectedAddress(kaikasAddress)
    }
    if (metamaskAddress) {
      setConnectedAddress(metamaskAddress)
    }
  }, [kaikasAddress, metamaskAddress])

  useEffect(() => {
    if (kip7 && connectedAddress) {
      getWalletBalance()
      getTokenInfo()
    }
  }, [kip7, connectedAddress])

  return (
    <div className="flex flex-col items-center w-full">
      {/* <button 
       type="button" 
       className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
       onClick={showInstruction}
       >       
         How to use it ?
         </button>
         {isModalHidden && ( 
           <div className="flex justify-center"> 
           <HowToModal />
           </div>
          )} */}
      <div className="mb-10">
        <Tooltip content="Link to the documentation">
          <a
            href="https://github.com/Krustuniverse-Klaytn-Group/klaytn-dev-sandbox#deploying-contracts"
            target="_blank"
            rel="noreferrer"
          >
            <Button>How to use the KIP7 Token </Button>
          </a>
        </Tooltip>
      </div>

      <div className="place-content-center font-body mb-6 tracking-widest shadow-md w-2/5 rounded-lg bg-gray-100">
        <div className="border-b-2 p-4 text-2xl flex place-content-between">
          {connectedAddress && kip7Balance && tokenSymbol ? (
            <>
              <span>{shortenAddress(connectedAddress)}</span>
              <span>
                {shortenBalance(kip7Balance).toLocaleString()} {tokenSymbol}
              </span>
            </>
          ) : (
            <>
              <span>{shortenAddress('0x0000000000')}</span>
              <span>0.0</span>
            </>
          )}
        </div>
        <div className="p-4 space-y-4">
          <label className="block">Receiving Address</label>
          <input
            className="rounded-md shadow-sm block py-2 px-2 w-full border border-gray-200"
            type="text"
            {...register('receivingAddress', { required: true, validate: validateAddress })}
          />
          {errors.receivingAddress && (
            <div className="text-lightorange">Please enter a valid wallet address</div>
          )}
          <label className="block">Number of Tokens</label>
          <input
            className="rounded-md shadow-sm block py-2 px-2 w-full border border-gray-200"
            type="number"
            {...register('sendValue', { required: true, validate: validateValue })}
          />
          {errors.sendValue && errors.sendValue.type === 'validate' && (
            <div className="text-lightorange">Value is more than balance</div>
          )}
          <button
            className="flex font-light items-center rounded-full bg-magma px-4 py-2 text-white"
            type="submit"
            onClick={handleSubmit(transferTokens)}
          >
            Send Tokens
          </button>
        </div>
      </div>
    </div>
  )
}

export default KIP7
