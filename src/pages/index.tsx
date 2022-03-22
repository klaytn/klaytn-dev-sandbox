import type { NextPage } from 'next'
import { ToastContainer, toast } from 'react-toastify'

const Home: NextPage = () => {
  return (
    <div className="flex justify-center mt-20">
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
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">How to use the Sandbox</h1>
      </div>
    </div>
  )
}

export default Home
