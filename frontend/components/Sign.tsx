import { useContext } from 'react'
import providerContext from '../context/context'

const Sign = () => {
  const { ethProvider, metamaskAddress, metamaskCaver, web3 } = useContext(providerContext)

  console.log('caver: ', metamaskCaver)
  const sign = async () => {
    const message = 'test'
    const txn = await metamaskCaver.klay.personal.sign(message, metamaskAddress)

    console.log('txn:', txn)
  }

  const ethereumSign = async () => {
    // const txn = await ethProvider.request({
    //   method: 'personal_sign',
    //   params: [message, metamaskAddress],
    // })
  }

  return (
    <div className="flex flex-col items-center w-full">
      <button
        className="flex font-light items-center rounded-full bg-magma px-4 py-2 text-white"
        onClick={sign}
      >
        Sign
      </button>
    </div>
  )
}

export default Sign
