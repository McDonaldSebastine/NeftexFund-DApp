import { FaEthereum } from "react-icons/fa"
import Identicons from "react-identicons"
import Moment from "react-moment"
import { shorten } from "../constant"


const CampaignSupporters = ({ supporters }) => {
  return (
    <div className="flex flex-col justify-center items-start bg-gray-500 px-6">
        <div className="max-h-[calc(100vh_-_20rem overflow-y-auto shadow-lg rounded-md md:w-2/3 mx-auto my-10 text-white">
            <table className="min-w-full">
                <thead className="border-b">
                    <tr>
                        <th scope="col" className="text-sm font-normal
                        px-6 py-4 text-left">
                            Supporter
                        </th>
                        <th scope="col" className="text-sm font-normal
                        px-6 py-4 text-left">
                           Fundings
                        </th>
                        <th scope="col" className="text-sm font-normal
                        px-6 py-4 text-left">
                            Refunds
                        </th>
                        <th scope="col" className="text-sm font-normal
                        px-6 py-4 text-left">
                           Time
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {supporters.map((supporter, i) => (
                        <Supporter key={i} supporter={supporter} />
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

const Supporter = ({ supporter }) => (
    <tr className="border-b border-gray-600">
          <td className="text-sm font-thin px-6 py-4 whitespace-nowrap">
              <div className="flex justify-start items-center space-x-2">
                  <Identicons className="h-10 w-10 object-contain rounded-full shadow-lg" 
                  string={supporter.owner} size={20} />
                  <span>{shorten (supporter.owner, 4, 4, 11)}</span>
              </div>
          </td>
          <td className="text-sm font-thin px-6 py-4 whitespace-nowrap">
              <small className="flex justify-start items-center space-x-1">
                  <FaEthereum />
                  <span className="font-medium">{supporter.participation} ETH</span>
              </small>
          </td>
          <td className="text-sm font-thin px-6 py-4 whitespace-nowrap">
              {supporter.refunded ? "Yes" : "No"}
          </td>
          <td className="text-sm font-thin px-6 py-4 whitespace-nowrap">
             <Moment fromNow> {supporter.timestamp}</Moment>
          </td>

    </tr>
  )

export default CampaignSupporters