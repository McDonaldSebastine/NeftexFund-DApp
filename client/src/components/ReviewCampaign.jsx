import { useState } from "react"
import { toast } from "react-toastify"
import { reviewcampaign } from "../utils/integration"
import { FaTimes } from "react-icons/fa"
import { useGlobalState, setGlobalState } from "../constant"


const ReviewCampaign = ({ campaign }) => {
    const [reviewMethod] = useGlobalState ("reviewMethod")
    const [title, setTitle] = useState(campaign?.title)
    const [description, setDescription] = useState(campaign?.description)
    const [date, setDate] = useState(campaign?.date)
    const [imageURL, setImageURL] = useState(campaign?.imageURL)
  
    const Period = (dateLt) => {
      const dateBt = Date.parse(dateLt)
      return dateBt / 1000
    }
  
    const tackleSubmit = async (e) => {
      e.preventDefault()
      if (!title || !description || !date || !imageURL) return
  
      const argums = {
        id : campaign?.id,
        title,
        description,
        deadline: Period(date),
        imageURL,
      }
    
      await reviewcampaign(argums)
      toast.success('Congratulations!, Campaign reviewed successfully, will reflect in 40sec.')
      onExit()
    }
  
    const onExit = () => {
      setGlobalState('reviewMethod', 'scale-0')
    }

  return (

    <div
        className={`fixed top-0 left-0 w-screen h-screen flex
        items-center justify-center bg-white bg-opacity-50
        transform transition-transform duration-300 ${reviewMethod}`}
    >                                                                                                                                                  
        <div className="bg-gray-400 shadow-lg shadow-black rounded-xl
                w-11/12 md:w-2/5 h-7/12 p-6">
                <form onSubmit={tackleSubmit} className="flex flex-col text-white">
                    <div className="flex justify-between items-center">
                        <p className="font-bold">Review Campaign</p>
                        <button
                            onClick={onExit}
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
                                    imageURL || "https://static.wixstatic.com/media/203fe7_916005a85253489d809f850b47817392~mv2.jpg/v1/fill/w_462,h_214,al_c/203fe7_916005a85253489d809f850b47817392~mv2.jpg"
                                }
                                alt="campaign title"
                                className="h-full w-full object-cover cursor"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center bg-white
                    rounded-xl mt-4">
                        <input className="block w-full bg-transparent border-0 text-sm
                        text-gray-600 font-medium focus:outline-none focus:ring-0"
                            type="text"
                            name="title"
                            placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required
                         />
                    </div>
                    
                    <div className="flex justify-between items-center bg-white
                    rounded-xl mt-4">
                        <input className="block w-full bg-transparent border-0 text-sm
                        text-gray-500 font-medium focus:outline-none focus:ring-0"
                            type="url"
                            name="imageURL"
                            placeholder="Image URL"
                            onChange={(e) => setImageURL(e.target.value)}
                            value={imageURL}
                            required
                         />
                    </div>
                    <div className="flex justify-between items-center bg-white
                    rounded-xl mt-4">
                        <input className="block w-full bg-transparent border-0 text-sm
                        text-gray-500 font-medium focus:outline-none focus:ring-0"
                            type="date"
                            name="date"
                            placeholder="Deadline"
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            required
                         />
                    </div>
                    <div className="flex justify-between items-center bg-white
                    rounded-xl mt-4">
                        <textarea className="block w-full bg-transparent border-0 text-sm
                        text-gray-600 font-medium focus:outline-none focus:ring-0"
                            type="text"
                            name="description"
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="inline-block px-6 py-2.5 bg-yellow-400
                         text-white font-medium text-md leading-tight rounded-full shadow-md hover:bg-yellow-500 mt-4">
                         Review Campaign 
                    </button>
                </form>

        </div>  
    
    </div>
  )
}

export default ReviewCampaign