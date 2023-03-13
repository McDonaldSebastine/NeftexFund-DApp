import { setGlobalState } from "../constant"
import { BsPlusLg } from "react-icons/bs"

const CustomButton = () => {
  return (
    <div className="flex fixed right-10 bottom-10 space-x-2 justify-center">
       <button type="button" className="flex justify-center items-center w-10 h-10 bg-purple-400
             text-white font-bold text-s leading-tight rounded-full shadow-md hover:bg-purple-500"
             onClick={() => setGlobalState("createMethod", "scale-100")}
            >
            <BsPlusLg className="font-semibold" size={25}/>
        </button>  
       
    </div>
  )
}

export default CustomButton