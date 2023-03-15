import { Link } from "react-router-dom"
import Identicons from "react-identicons"
import { useState, useEffect } from "react"
import { shorten, daysRemaining } from "../constant"
import { FaEthereum } from "react-icons/fa"

const Campaigns = ({ campaigns }) => {
    const [end, setEnd] = useState(3)
    const [tally] = useState(3)
    const [procurement, setProcurement] = useState([])

    const getProcurement = () => campaigns.slice(0, end)

    useEffect(() =>{
        setProcurement(getProcurement)
    },[campaigns, end])

  return (
        <div className="flex flex-col px-6 bg-gray-500">
            <div className="flex justify-center items-center flex-wrap text-white">
                {procurement.map((campaign, i) => (
                    <CampaignForm key={i} campaign={campaign} />
                ))}
            </div>
            
            {campaigns.length > procurement.length ?(
                <div className="flex justify-center bg-gray-500 items-center">
                    <button type="button" className="inline-block px-6 py-2.5 bg-purple-400
                        text-white font-medium text-s leading-tight rounded-full shadow-md hover:bg-purple-500 mb-4"
                        onClick={() => setEnd(end + tally)}
                    >
                        Show More
                    </button>
                </div>

            ) : null}
            
        </div>
    )
}

const CampaignForm = ({ campaign }) => {
    const ended = new Date().getTime() > Number(campaign?.deadline + '000')

    return (
        <div id="campaigns" className="rounded-lg shadow-lg bg-gray-500 w-64 m-4">
        <Link to={"/campaigns/" + campaign.id}>
            <img 
                src={campaign?.imageURL}
                alt={campaign?.title}
                className="rounded-xl h-64 w-full object-cover"/>
            <div className="p-4">
            <   h5> {shorten(campaign?.title, 25, 0, 28)}</h5>
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                      <Identicons className="rounded-full shadow-md"
                        string={campaign?.owner} size={20} /> 
                      <small className="text-white">{shorten (campaign?.owner, 4, 4, 11)}</small>  
                    </div>

                    <small className="text-white">
                        {ended ? "Ended" : daysRemaining(campaign?.deadline) + "left"}
                    </small>   
                </div>

                <div className="w-full bg-white overflow-hidden">
                    <div className="bg-purple-400 text-xs font-medium
                    text-white text-center p-0.5 leading-none rounded-l-full"
                    style={ {width: `${(campaign?.amountAccrued / campaign?.amount) * 100 }%` }}>
                    </div>
                </div>

                <div className="flex justify-between items-center font-bold mt-1 mb-2 text-white">
                   <small> {campaign?.amountAccrued} ETH Accrued</small>
                   <small className="flex justify-start items-center">
                    <FaEthereum />
                    <span>{campaign?.amount} ETH</span>
                   </small>
        
                </div>

                <div className="flex justify-between items-center text-white font-semibold flex-wrap mt-4 mb-2">
                    <small>{campaign?.supporters} Supporter {campaign?.supporters == 1 ? "" : "s"} </small>
                    <div>
                        {ended ? (
                            <small className="text-red-700">Ended</small>
                        ) : campaign?.check == 0 ? (
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
            </div>
        </Link>
    </div>
   ) 
}

export default Campaigns
