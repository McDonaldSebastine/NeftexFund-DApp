import Identicons from "react-identicons"
import { FaEthereum } from "react-icons/fa"
import { setGlobalState, useGlobalState, daysRemaining, shorten } from "../constant"
import { withdrawcampaign } from "../utils/integration"


const CampaignDetails = ({ campaign }) => {
    const [accountConnected] = useGlobalState("accountConnected")
    const ended = new Date().getTime() > Number (campaign?.deadline + '000')
    
  return (
    <div className="flex justify-center bg-gray-500 py-24 px-6">
        <div className="flex flex-col md:w-2/3">
            <div className="flex justify-start items-start sm:space-x-4 flex-wrap">
                <img  
                    src={campaign?.imageURL}
                    alt={campaign?.title}
                    className="rounded-xl h-64 w-full sm:w-1/3 object-cover"
                />

                <div className="text-white flex-1 sm:py-0 py-4">
                    <div className="flex flex-col justify-start flex-wrap">
                        <h5 className="text-xl font-semibold mb-2"> {campaign?.title} </h5>
                        <small className="text-white">
                            {ended? "Ended" 
                            : daysRemaining(campaign?.deadline) + "left"}
                        </small>
                    </div>

                    <div>
                        <div className="flex justify-between items-center w-full pb-2">
                            <div className="flex justify-start space-x-2 font-semibold mb-3">
                                <Identicons className="rounded-full shadow-md"
                                string={campaign?.owner} size={20}/>
                                {campaign?. owner ? (
                                    <small>{shorten (campaign?.owner, 4, 4, 11) }</small>
                                ) : null}

                                <small>{campaign?.supporters} Supporter {campaign?.supporters == 1 ? "" : "s"} </small>
                            </div>
                            <div className="font-bold">
                                {campaign?.check == 0 ? (
                                    <small className="text-purple-400">Show</small>
                                ) : campaign?.check == 1 ? (
                                    <small className="text-white">Confirmed</small>
                                ) : campaign?.check == 2 ? (
                                    <small className="text-yellow-600">Reversed</small>
                                ) : campaign?.check == 3 ? (
                                    <small className="text-red-700">Terminated</small>
                                ) : (  
                                    <small className="text-teal-400">Withdrawn</small>
                                )} 
                       
                            </div>
                        </div>
                  
                            <p className="text-white text-sm font-thin mt-1"> {campaign?.description}</p>
                            <div className="w-full bg-white mt-3">
                                <div className="bg-purple-400 text-xs font-medium
                                    text-white text-center p-0.5 leading-none rounded-l-full"
                                    style={{width: `${(campaign?.amountAccrued / campaign?.amount) * 100 }%` }} 
                                >
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center
                         text-white font-semibold mt-1">
                            
                            <small>{campaign?.Accrued} ETH Accrued</small>
                            <small className="flex justify-start items-center">
                                <FaEthereum />
                                <span>{campaign?.amount} ETH</span>
                            </small>
                        </div>
                
                        <div className="flex justify-start items-center space-x-2 mt-2">
                            {campaign ?.check == 0 ? (
                                <button type="button" className="inline-block px-6 py-2.5 bg-purple-400
                                text-white font-medium text-s leading-tight rounded-full shadow-md hover:bg-purple-500"
                                onClick={() => setGlobalState("supportMethod", "scale-100")}
                                >
                                Support<b> Campaign</b> 
                                </button>

                            ) : null}

                            {accountConnected == campaign?.owner ? (
                                campaign?.check != 3 ? (
                                    campaign?.check == 1 ? (
                                        <button type="button" className="inline-block px-6 py-2.5 bg-teal-400
                                            text-white font-medium text-s leading-tight rounded-full shadow-md hover:bg-teal-500"
                                            onClick={() => withdrawcampaign(campaign?.id)}
                                        >
                                            Withdraw
                                        </button>

                                ) : campaign?.check != 4 ?  (
                                        
                                    <>
                                        <button type="button" className="inline-block px-6 py-2.5 bg-yellow-400
                                            text-white font-medium text-s leading-tight rounded-full shadow-md hover:bg-yellow-500"
                                            onClick={() => setGlobalState("reviewMethod", "scale-100")}
                                        >
                                            Review 
                                        </button>

                                        <button type="button" className="inline-block px-6 py-2.5 bg-red-400
                                            text-white font-medium text-s leading-tight rounded-full shadow-md hover:bg-red-500"
                                            onClick={() => setGlobalState("terminateMethod", "scale-100")}
                                        >
                                            Terminate 
                                        </button>

                        
                                    </>
                                ) : (
                                        <button type="button" className="inline-block px-6 py-2.5 bg-blue-400
                                        text-white font-medium text-s leading-tight rounded-full shadow-md hover:bg-blue-500"
                                        
                                    >
                                        Campaign Ended
                                    </button> 
                                )
                                    
                            ) : (null)
                        ) : null}
                    </div>
                  </div>  
                </div>
            </div>
        </div>
    )
}

export default CampaignDetails
