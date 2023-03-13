import { setGlobalState, useGlobalState } from "../constant"

const Master = () => {
    const [counts] = useGlobalState("counts")
    
  return (
    <div className="flex flex-col bg-gray-500 text-white py-24 px-6">
        <h1 className="text-4xl md:text-5xl xl:text-6xl tracking-tight mb-12">
            <span><b>Experience the fascinating touch</b> <br />of integral fund raising on</span>
            <br />
            <span className="text-purple-400"><b>NeftexFund.</b></span>
        </h1>
        <div className="flex justify-center items-center space-x-2">
            <button type="button" className="inline-block px-6 py-2.5 bg-purple-400
             text-white font-medium text-s leading-tight rounded-full shadow-md hover:bg-purple-500"
             onClick={() => setGlobalState("createMethod", "scale-100")}
            >
                 Create<b> Campaign</b> 
            </button>    
            <button type="button" className="inline-block px-6 py-2.5 border border-purple-400
             text-purple-400 font-medium text-s leading-tight rounded-full bg-transparent shadow-md hover:bg-purple-500"
             onClick={() => setGlobalState("supportMethod", "scale-100")}
            >
                Support<b> Campaign</b> 
            </button> 
        </div>

        <div className="flex justify-center items-center mt-8">
            <div className="flex flex-col justify-center items-center h-24 shadow-md w-full ">
                <span className="text-lg font-black text-purple-400 leading-7">
                    {counts ?.totalNumOfCampaigns || 0}
                </span>
                <span>Campaigns</span>
            </div>
            <div className="flex flex-col justify-center items-center h-24 shadow-md w-full ">
                <span className="text-lg font-black text-purple-400 leading-7">
                    {counts ?.totalNumOfSupports || 0}
                </span>
                <span>Supports</span>
            </div>
            <div className="flex flex-col justify-center items-center h-24 shadow-md w-full ">
                <span className="text-lg font-black text-purple-400 leading-7">
                    {counts ?.totalNumOfFundings || 0} ETH
                </span>
                <span>Funded</span>
            </div>

        </div>
    </div>
  )
}

export default Master