import type { NextPage } from 'next'
import { ToastContainer, toast } from 'react-toastify'

const Home: NextPage = () => {
  return (
    <div className="flex justify-center mt-20">
      <div className="space-y-4 w-1/3">
        <h1 className="text-2xl font-semibold">How to use the Sandbox:</h1>
        <ul className="space-y-3">
          <li>
            1. Navigate to the <span className="font-semibold">contracts/token</span> folder.
          </li>
          <li>
            2. Make modfications to the existing contract implementations, or create your own by
            inheriting from them.
          </li>
          <li>
            3. To deploy, create a .env file in the root folder containing your privateKey and
            Baobab endpoint details for connecting to the Baobab network
          </li>
          <li>
            4. Navigate to <span className="font-semibold">/src</span> and enter{' '}
            <span className="font-semibold">npm run dev</span> to spin up the frontend.
          </li>
          <li>
            5. Click the Connect Wallet button where you'll be prompted to connect your Kaikas or
            Metamask wallet.
          </li>
          <li>6. Make sure that you are connected to the Baobab network!</li>
          <li>
            7. Click on the <span className="font-semibold">Contracts</span> tab and interact with
            the contracts you have just deployed!
          </li>
          <li>
            8. To view your wallet balance and conveniently send some testnet KLAY, navigate to the{' '}
            <span className="font-semibold">Wallet</span> tab.
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home
