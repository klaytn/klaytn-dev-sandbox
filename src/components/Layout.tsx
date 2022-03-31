import Header from './Header'
import Footer from './Footer'
import 'tailwindcss/tailwind.css'
import { useEffect, useContext } from 'react'
import providerContext from '../context/context'

declare const window: any

const Layout = ({ children }: { children: any }) => {
  const { setKlaytnProvider, setEthProvider } = useContext(providerContext)

  useEffect(() => {
    if (typeof window.klaytn !== 'undefined') {
      const provider = window['klaytn']
      setKlaytnProvider(provider)
    }
    if (typeof window.caver !== 'undefined') {
      console.log('caver: ', window.caver)
    }
    if (typeof window.ethereum !== 'undefined') {
      const provider = window.ethereum
      setEthProvider(provider)
    }
  }, [])

  return (
    <div className="flex flex-col h-screen justify-between font-Outfit">
      <Header />
      <main className="font-light mb-auto">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
