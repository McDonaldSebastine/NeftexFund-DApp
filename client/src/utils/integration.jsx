import abi from "../contexts/NeftexFund.json";
import address from "../contexts/contractAddress.json";
import { getGlobalState, setGlobalState} from "../constant";
import { ethers } from "ethers";

const { ethereum } = window;
const contractAddress = address.address;
const contractAbi = abi.abi;
let tx;
 
const connectWallet = async () => {
  try {
    if (!ethereum) return alert('You do not have Metamask on your browser, Kindly install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('accountConnected', accounts[0]?.toLowerCase())
  } catch (error) {
    reportError(error)
  }
}

const checkWalletConnection = async () => {
  try {
    if (!ethereum) return alert('You do not have Metamask on your browser, Kindly install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    setGlobalState('accountConnected', accounts[0]?.toLowerCase())

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('accountConnected', accounts[0]?.toLowerCase())
      await checkWalletConnection()
    })

    if (accounts.length) {
      setGlobalState('accountConnected', accounts[0]?.toLowerCase())
    } else {
      alert('Kindly connect wallet.')
      console.log('Sorry!, could not find accounts.')
    }
  } catch (error) {
    reportError(error)
  }
}

const getNeftexfundContract = async () => {
    const accountConnected = getGlobalState('accountConnected')
  
    if (accountConnected != null) { // check if truthy not just if it exists
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractAbi, signer)
  
      return contract
    } else {
      return getGlobalState('contract')
    }
  }
  
  const startcampaign = async ({
    title,
    description,
    imageURL,
    amount,
    deadline,
  }) => {
    try {
      if (!ethereum) return alert('You do not have Metamask on your browser, Kindly install Metamask')
  
      const contract = await getNeftexfundContract()
      amount = ethers.utils.parseEther(amount)
      tx = await contract.startcampaign(title, description, imageURL, amount, deadline)
      await tx.wait()
      await loadcampaigns()
    } catch (error) {
      reportError(error)
    }
  }
  
  const reviewcampaign = async ({
    id,
    title,
    description,
    imageURL,
    deadline,
  }) => {
    try {
      if (!ethereum) return alert('You do not have Metamask on your browser, Kindly install Metamask')
  
      const contract = await getNeftexfundContract()
      tx = await contract.reviewcampaign(id, title, description, imageURL, deadline)
      await tx.wait()
      await loadcampaign(id)
    } catch (error) {
      reportError(error)
    }
  }
  
  const terminatecampaign = async (id) => {
    try {
      if (!ethereum) return alert('You do not have Metamask on your browser, Kindly install Metamask')
      const contract = await getNeftexfundContract()
      await contract.terminatecampaign(id)
    } catch (error) {
      reportError(error)
    }
  }

  
  const loadcampaigns = async () => {
    try {
      if (!ethereum) return alert('You do not have Metamask on your browser, Kindly install Metamask')
  
      const contract = await getNeftexfundContract()
      const campaigns= await contract.getcampaigns()
      const counts = await contract.counts()
  
      setGlobalState('counts', layeredCounts(counts))
      setGlobalState('campaigns', layeredCampaigns(campaigns))
    } catch (error) {
      reportError(error)
    }
  }

  const loadcampaign = async (id) => {
    try {
      if (!ethereum) return alert('You do not have Metamask on your browser, Kindly install Metamask')
      console.log("This is the id ", id)
      const contract = await getNeftexfundContract()
      const campaign = await contract.getcampaign(id)
     

      setGlobalState('campaign', layeredCampaigns([campaign])[0])
    } catch (error) {
      alert(JSON.stringify(error.message))
      reportError(error)
    }
  }
  
  const supportcampaign = async (id, amount) => {
    try {
      if (!ethereum) return alert('You do not have Metamask on your browser, Kindly install Metamask')
      const accountConnected = getGlobalState('accountConnected')
      const contract = await getNeftexfundContract()
      amount = ethers.utils.parseEther(amount)
  
      tx = await contract.supportcampaign(id, {
        from: accountConnected,
        value: amount._hex,
      })
  
      await tx.wait()
      await getsupporters(id)
    } catch (error) {
      reportError(error)
    }
  }
  
  const getsupporters = async (id) => {
    try {
      if (!ethereum) return alert('You do not have Metamask on your browser, Kindly install Metamask')
      const contract = await getNeftexfundContract()
      let supporters = await contract.getsupporters(id)
  
      setGlobalState('supporters', layeredSupporters(supporters))
    } catch (error) {
      reportError(error)
    }
  }
  
  const withdrawcampaign= async (id) => {
    try {
      if (!ethereum) return alert('You do not have Metamask on your browser, Kindly install Metamask')
      const accountConnected = getGlobalState('accountConnected')
      const contract = await getNeftexfundContract()
  
      tx = await contract.withdrawcampaign(id, {
        from: accountConnected,
      })
  
      await tx.wait()
      await getsupporters(id)
    } catch (error) {
      reportError(error)
    }
  }
  
  const layeredSupporters = (supporters) =>
    supporters
      .map((supporter) => ({
        owner: supporter.owner.toLowerCase(),
        refunded: supporter.refunded,
        timestamp: new Date(supporter.timestamp.toNumber() * 1000).toJSON(),
        participation: parseInt(supporter.participation._hex) / 10 ** 18,
      }))
      .reverse()
  
  const layeredCampaigns= (campaigns) =>
    campaigns
      .map((campaign) => {
        console.log("This is the campaign", campaign)
        return {
          id: campaign.id.toNumber(),
          owner: campaign.owner.toLowerCase(),
          title: campaign.title,
          description: campaign.description,
          timestamp: new Date(campaign.timestamp?.toNumber()).getTime(),
          deadline: new Date(campaign.deadline?.toNumber()).getTime(),
          date: toDate(campaign.deadline?.toNumber() * 1000),
          imageURL: campaign.imageURL,
          amountAccrued: parseInt(campaign.amountAccrued._hex) / 10 ** 18,
          amount: parseInt(campaign.amount._hex) / 10 ** 18,
          supporters: campaign.supporters?.toNumber(),
          check: campaign.check,
        }

      })
      .reverse()
  
  const toDate = (timestamp) => {
    const date = new Date(timestamp)
    const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    const mm = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    const yyyy = date.getFullYear()
    return `${yyyy}-${mm}-${dd}`
  }
  
  const layeredCounts = (counts) => {
     return{ 
    totalNumOfCampaigns: counts.totalNumOfCampaigns?.toNumber(),
    totalNumOfSupports: counts.totalNumOfSupports?.toNumber(),
    totalNumOfFundings: parseInt(counts.totalNumOfFundings._hex) / 10 ** 18,
   }}  
  const reportError = (error) => {
    console.log(error.message)
    throw new Error("Sorry!, but no ethereum object was found.")
  }

  export {
    connectWallet,
    checkWalletConnection,
    startcampaign,
    reviewcampaign,
    terminatecampaign,
    loadcampaigns,
    loadcampaign,
    supportcampaign,
    getsupporters,
    withdrawcampaign,
  }
  
