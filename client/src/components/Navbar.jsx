import { Link } from "react-router-dom"
import { useGlobalState, shorten } from "../constant"
import { connectWallet } from "../utils/integration"


const Navbar = () => {
  const [accountConnected] = useGlobalState ("accountConnected")

  return (
    <header className='flex justify-between items-center p-5 bg-gray-500
       shadow-lg fixed top-0 left-0 right-0'>
      <Link to="/" className='flex justify-start items-center text-xl text-purple-300'>
        <span><b>Neftex</b>Fund</span>
      </Link>

      <div className="flex space-x-2 justify-center">
          {accountConnected ? (
            <button type="button" className="inline-block px-6 py-2.5 bg-purple-400
            text-white font-medium text-s leading-tight rounded-full shadow-md hover:bg-purple-500">
              {shorten (accountConnected, 4, 4, 11)}
            
            </button>
          ) : (

            <button type="button" className="inline-block px-6 py-2.5 bg-purple-400
                text-white font-medium text-s leading-tight rounded-full shadow-md hover:bg-purple-500"
                onClick={connectWallet}
            >
              <b>Connect</b> Wallet
              
            </button>

          )}
            
      </div>

    </header>
  )
}

export default Navbar