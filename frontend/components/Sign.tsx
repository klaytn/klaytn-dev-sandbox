import { useContext } from 'react'
import providerContext from '../context/context'

const Sign = () => {
  const { metamaskAddress, metamaskCaver } = useContext(providerContext)

  const sign = async () => {
    const message = 'test'
    const txn = await metamaskCaver.rpc.klay.sign(metamaskAddress, message)
    console.log('txn:', txn)
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
