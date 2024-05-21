import { useForm } from 'react-hook-form'
import { useState, useEffect, useContext } from 'react'
import providerContext from '../context/context'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { shortenAddress, shortenBalance, validateAddress } from '../helpers'
import { Button, Tooltip } from 'flowbite-react'
import BigNumber from 'bignumber.js'
type FormData = {
  receivingAddress: string
  sendValue: string
}

interface props {
  kip7: any
}

const KIP7 = ({ kip7 }: props) => {
  const { caver, web3, metamaskAddress, kaikasAddress } = useContext(providerContext)
  const [kip7Balance, setKip7Balance] = useState<string>('')
  const [tokenSymbol, setTokenSymbol] = useState()
  const [connectedAddress, setConnectedAddress] = useState()
  const [txnHash, setTxnHash] = useState('')
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const getWalletBalance = async () => {
    const userBalance = await kip7.methods.balanceOf(connectedAddress).call()
    if (userBalance && userBalance > 0) {
      if (caver) {
        setKip7Balance(BigNumber(caver.utils.fromPeb(userBalance, 'KLAY')).toFixed(2))
      } else if (web3) {
        setKip7Balance(BigNumber(web3.utils.fromWei(userBalance, 'ether')).toFixed(2))
      }
    }
  }

  const getTokenInfo = async () => {
    const symbol = await kip7.methods.symbol().call()
    setTokenSymbol(symbol)
  }

  const transferTokens = async () => {
    const receiver = getValues('receivingAddress')
    const sendValue = getValues('sendValue')
    let gasPrice = 0
    if (caver) {
      gasPrice = await caver.klay.getGasPrice()
    } else if (web3) {
      gasPrice = await web3.eth.getGasPrice()
    }

    const id = toast.loading('Sending Tokens....', { theme: 'colored' })
    try {
      if (!kip7) {
        toast.update(id, {
          render: 'Contract not deployed yet',
          type: 'error',
          autoClose: 3000,
          isLoading: false,
        })
      } else {
        let transferAmount = 0
        if (caver) {
          transferAmount = caver.utils.toPeb(sendValue, 'KLAY')
        } else if (web3) {
          transferAmount = web3.utils.toWei(sendValue, 'ether')
        }
        const txn = await kip7.methods
          .transfer(receiver, transferAmount)
          .send({ from: connectedAddress, gasPrice: gasPrice, gas: '0xF4240' })
        console.log('successfully sent tokens: ', txn)
        setTxnHash(txn.transactionHash)
        toast.update(id, {
          render: 'Tokens sent successfully',
          type: 'success',
          autoClose: 3000,
          isLoading: false,
        })
        reset()
        getWalletBalance()
      }
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
                {kip7Balance} {tokenSymbol}
              </span>
            </>
          ) : (
            <>
              <span>{shortenAddress('0x0000000000')}</span>
              <span>0.0</span>
            </>
          )}
        </div>
        <form className="p-4 space-y-4">
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
            min="0"
            {...register('sendValue', {
              required: true,
              max: { value: kip7Balance, message: 'The value is more than balance' },
              min: 0,
            })}
          />
          {errors.sendValue && (
            <div className="text-lightorange">The value is not valid or more than balance</div>
          )}
          <button
            className="flex font-light items-center rounded-full bg-magma px-4 py-2 text-white"
            type="submit"
            onClick={handleSubmit(transferTokens)}
          >
            Send Tokens
          </button>
        </form>
      </div>
      {txnHash ? (
        <div className="flex items-center justify-center pt-5 pb-5">
          <a
            style={{ border: '1px solid #850000', padding: '0px 10px 0px 10px' }}
            href={'https://baobab.scope.klaytn.com/tx/' + txnHash}
            target="_blank"
            rel="noreferrer"
          >
            <b>Transaction Hash:</b> {txnHash}
          </a>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default KIP7
