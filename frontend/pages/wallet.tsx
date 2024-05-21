import type { NextPage } from 'next'
import TransferKlay from '../components/TransferKlay'
import { ToastContainer, toast } from 'react-toastify'

const Wallet: NextPage = () => {
  return (
    <div className="mt-20">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <TransferKlay />
    </div>
  )
}

export default Wallet
