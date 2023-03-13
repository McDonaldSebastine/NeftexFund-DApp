import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Campaign from "./display/Campaign"
import Home from "./display/Home"
import { checkWalletConnection } from "./utils/integration"
import { ToastContainer } from "react-toastify"


const App = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(async () => { await checkWalletConnection ()
  console.log ("Ethereum Blockchain loaded") 
  setLoaded(true)
}, [])
  

  return (
    <div className="min-h-screen relative">
      <Navbar />
      {loaded ? (
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/campaigns/:id" element={<Campaign />}/>
          </Routes>

        ) : null }
     
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
     
    </div>
  )
}

export default App
