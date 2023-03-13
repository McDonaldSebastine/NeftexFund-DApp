import { FaTimes } from "react-icons/fa"
import { setGlobalState, useGlobalState } from "../constant"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { terminatecampaign } from "../utils/integration"


const TerminateCampaign = ({campaign}) => {
    const [terminateMethod] = useGlobalState ("terminateMethod")
    const navigate = useNavigate()

    const tackleSubmit = async () => {
        await terminatecampaign(campaign?.id)
        toast.success('campaign Terminated successfully, will reflect in 40sec.')
        setGlobalState('terminateMethod', 'scale-0')
        navigate.push('/')
      }
    
  return (
    <div
        className={`fixed top-0 left-0 w-screen h-screen flex
        items-center justify-center bg-white bg-opacity-50
        transform transition-transform duration-300 ${terminateMethod}`}
    >                                                                                                                                                  
        <div className="bg-gray-400 shadow-lg shadow-black rounded-xl
            w-11/12 md:w-2/5 h-7/12 p-6">
                <div className="flex flex-col text-white">
                    <div className="flex justify-between items-center">
                        <p className="font-bold">{campaign?.title}</p>
                        <button
                            onClick={() => setGlobalState("terminateMethod", "scale-0")}
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
                                alt={campaign?.title}
                                className="h-full w-full object-cover cursor"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center rounded-sm">
                        <p>You are about to terminate your Campaign. 
                            Are you sure you want to do this?</p>
                        <small className="text-sm text-red-500">You may not be able to recover it once terminated!</small>
                    </div>

                    <button type="submit" className="inline-block px-6 py-2.5 bg-red-400
                         text-white font-medium text-md leading-tight rounded-full shadow-md hover:bg-red-500 mt-4"
                         onClick={tackleSubmit}
                         >
                         Terminate Campaign 
                    </button>
                </div>
        </div>  
    </div>
  )
}

export default TerminateCampaign