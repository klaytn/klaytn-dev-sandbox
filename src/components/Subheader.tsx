import Link from 'next/link'
import { useState } from 'react'

const Subheader = () => {
  const [active, setActive] = useState('')

  return (
    <div className="flex place-content-center items-center text-gray-900 bg-gray-100 shadow">
      <div className="flex text-xl">
        <Link href="/contracts">
          {active === 'contracts' ? (
            <button className="mx-10 font-light transition ease-in-out duration-400 delay-100 border-magma text-magma border-b-2 pb-2  border-gray-100">
              Contracts
            </button>
          ) : (
            <button
              onClick={() => setActive('contracts')}
              className="mx-10 font-light transition ease-in-out duration-400 delay-100 hover:scale-110  hover:text-magma hover:border-b-2 hover:border-magma focus:border-magma focus:text-magma focus:border-b-2 pb-2 border-b-2 border-gray-100"
            >
              Contracts
            </button>
          )}
        </Link>
        <Link href="/transfers">
          {active === 'transfers' ? (
            <button className="mx-10 font-light transition ease-in-out duration-400 delay-100 border-magma text-magma border-b-2 pb-2  border-gray-100">
              Transfers
            </button>
          ) : (
            <button
              onClick={() => setActive('transfers')}
              className="mx-10 font-light transition ease-in-out duration-400 delay-100 hover:scale-110  hover:text-magma hover:border-b-2 hover:border-magma focus:border-magma focus:text-magma focus:border-b-2 pb-2 border-b-2 border-gray-100"
            >
              Transfers
            </button>
          )}
        </Link>
      </div>
    </div>
  )
}

export default Subheader
