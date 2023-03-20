import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CampaignDetails from "../components/CampaignDetails"
import CampaignSupporters from "../components/CampaignSupporters"
import ReviewCampaign from "../components/ReviewCampaign"
import SupportCampaign from "../components/SupportCampaign"
import TerminateCampaign from "../components/TerminateCampaign"
import { loadcampaign, getsupporters } from "../utils/integration"
import { useGlobalState } from "../constant"



const Campaign = () => {
  const { id } = useParams()
  const [loaded, setLoaded] = useState(false)
  const [campaign] = useGlobalState("campaign")
  const [supporters] = useGlobalState("supporters")
  useEffect(async () => {
    await loadcampaign(id)
    await getsupporters(id)
    setLoaded(true)
  }, [])
  return loaded ? (
    <>
     <CampaignDetails campaign={campaign} />
     <CampaignSupporters supporters={supporters} />
     <ReviewCampaign campaign={campaign} />
     <SupportCampaign campaign={campaign}/>
     <TerminateCampaign campaign={campaign}/>
    </>
  ) : null
}

export default Campaign
