import type { NextPage } from 'next'
import TransferKlay from '../components/TransferKlay'
import Sign from '../components/Sign'

const Transfers: NextPage = () => {
  return (
    <div className="mt-20">
      <TransferKlay />
      <Sign />
    </div>
  )
}

export default Transfers
