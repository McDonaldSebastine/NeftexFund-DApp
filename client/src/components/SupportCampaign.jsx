import { useState } from "react"
import { FaTimes } from "react-icons/fa"
import { useGlobalState, setGlobalState } from "../constant"
import { toast } from "react-toastify"
import { supportcampaign } from "../utils/integration"


const SupportCampaign = ({ campaign }) => {
    const [supportMethod] = useGlobalState ("supportMethod")
    const [amount, setAmount] = useState("")
    
    const tackleSubmit = async (e) => {
        e.preventDefault()
        if (!amount) return
        
        await supportcampaign(campaign?.id, amount)
        toast.success("Congratulations, Campaign supported successfully, will reflect in 40sec.")
        setGlobalState("supportMethod", "scale-0")
    }


  return (
    <div
        className={`fixed top-0 left-0 w-screen h-screen flex
        items-center justify-center bg-white bg-opacity-50
        transform transition-transform duration-300 ${supportMethod}`}
    >                                                                                                                                                  
        <div className="bg-gray-400 shadow-lg shadow-black rounded-xl
            w-11/12 md:w-2/5 h-7/12 p-6">
                <form onSubmit={tackleSubmit} className="flex flex-col text-white">
                    <div className="flex justify-between items-center">
                        <p className="font-bold">{campaign?.tittle}</p>
                        <button
                            onClick={() => setGlobalState("supportMethod", "scale-0")}
                            type="button"
                            className="border-0 bg-transparent focus:outline-none"
                        >
                            <FaTimes />
                            
                        </button>
                    </div>
                    <div className="flex justify-center items-center mt-5">
                        <div className="rounded-xl overflow-hidden h-20 w-20">
                            <img 
                                src={
                                    campaign?.imageURL ||
                                    "https://www.peerbits.com/static/7fcbdad925f5a00542e074d95609078a/189bc/dapp-development-main.jpg"
                                }
                                alt={campaign?.tittle}
                                className="h-full w-full object-cover cursor"
                            />
                        </div>
                    </div>

                    
                    <div className="flex justify-between items-center bg-white
                    rounded-xl mt-4">
                        <input className="block w-full bg-transparent border-0 text-sm
                        text-gray-500 font-medium focus:outline-none focus:ring-0"
                            type="number"
                            step={0.01}
                            min={0.01}
                            name="amount"
                            placeholder="Amount {ETH}"
                            onChange={(e) => setAmount(e.target.value)}
                            value={amount}
                            required
                         />
                    </div>

                    <button type="submit" className="inline-block px-6 py-2.5 bg-purple-400
                         text-white font-medium text-md leading-tight rounded-full shadow-md hover:bg-purple-500 mt-4">
                         Support Campaign 
                    </button>
                </form>

        </div>  
    
    </div>
  )
}

export default SupportCampaign