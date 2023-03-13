import Campaigns from "../components/Campaigns"
import Master from "../components/Master"
import StartCampaign from "../components/StartCampaign"
import CustomButton from "../components/CustomButton"
import { useEffect } from "react"
import { loadcampaigns } from "../utils/integration"
import { useGlobalState } from "../constant"


const Home = () => {
  const [campaigns] = useGlobalState("campaigns")

  useEffect(async () => {
    await loadcampaigns()
  }, [])
  return (
    <>
      <Master />
      <Campaigns campaigns={campaigns} /> 
      <StartCampaign />
      <CustomButton />
    </>
  )
}

export default Home