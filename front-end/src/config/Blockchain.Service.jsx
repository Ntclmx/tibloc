import Web3 from "web3";
import abi from '../../src/constants/abi/TiblocNFT.json'
import { setGlobalState, getGlobalState, setAlert } from "./Store";

const {ethereum} = window;
window.web3 = new Web3(ethereum)
window.web3 = new Web3(window.web3.currentProvider)

const getEtheriumContract = async () => {
    const connectedAccount = getGlobalState('connectedAccount')
  
    if (connectedAccount) {
      const web3 = window.web3
      const networkId = await web3.eth.net.getId()
      const networkData = abi.networks[networkId]
  
      if (networkData) {
        const contract = new web3.eth.Contract(abi.abi, networkData.address)
        return contract
      } else {
        return null
      }
    } else {
      return getGlobalState('contract')
    }
  }
  
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask')
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setGlobalState('connectedAccount', accounts[0].toLowerCase())
    } catch (error) {
      reportError(error)
    }
  }
  
  const isWallectConnected = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask')
      const accounts = await ethereum.request({ method: 'eth_accounts' })
  
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload()
      })
  
      window.ethereum.on('accountsChanged', async () => {
        setGlobalState('connectedAccount', accounts[0].toLowerCase())
        await isWallectConnected()
      })
  
      if (accounts.length) {
        setGlobalState('connectedAccount', accounts[0].toLowerCase())
      } else {
        alert('Please connect wallet.')
        console.log('No accounts found.')
      }
    } catch (error) {
      reportError(error)
    }
  }
  
  const structuredNfts = (nfts) => {
    return nfts
      .map((nft) => ({
        tokenId: Number(nft.tokenId),
        holderOf: nft.holderOf.toLowerCase(),
        salesPrice: window.web3.utils.fromWei(nft.salesPrice),
        title: nft.title,
        description: nft.description,
        tokenURI: nft.tokenURI,
        timestamp: nft.timestamp,
        isUsed: nft.isUsed,
        eventCategoryId: nft.eventCategoryId,
        eventDate: nft.eventDate
      }))
      .reverse()
  }
  
  const getAllNFTs = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask')

      await isWallectConnected()
      const contract = await getEtheriumContract()
      const nfts = await contract.methods.getAllNFTs().call()
    //   const transactions = await contract.methods.getAllTransactions().call()
  
      setGlobalState('nfts', structuredNfts(nfts))
    //   setGlobalState('transactions', structuredNfts(transactions))
    } catch (error) {
      reportError(error)
    }
  }

  const getAllNftsOwnedBy = async () => {
    try{
      if(!ethereum) return alert('Please install Metamask')
      
      await getAllNFTs()

      const account = getGlobalState('connectedAccount')
      const nfts = getGlobalState('nfts');
      let nftsOwned = [];
      for(const nft of nfts){
        if(nft.holderOf === account) nftsOwned.push(nft)
      }
      setGlobalState('nftsOwned', nftsOwned);
    } catch (error){
      reportError(error)
    }
  }

  const isOwned = async (eventCategoryId) => {
    try{
      if(!ethereum) return alert('Please install Metamask')
      await getAllNftsOwnedBy()
      const nftsOwned = getGlobalState('nftsOwned')
      for(const nft of nftsOwned){
        if(nft.eventCategoryId === eventCategoryId) return nft.tokenId
      }
    } catch (error) {
      reportError(error);
      return -1;
    }
    return -1
  }
  
  const mintNFT = async ({ title, description, tokenURI, salesPrice, eventCategoryId, eventDate }) => {
    try {
      salesPrice = window.web3.utils.toWei(salesPrice.toString(), 'ether')
      const contract = await getEtheriumContract()
      const account = getGlobalState('connectedAccount')
      const mintPrice = window.web3.utils.toWei(salesPrice + 0.001, 'ether')
  
      await contract.methods
        .payToMint(title, description, tokenURI, salesPrice, eventCategoryId, eventDate)
        .send({ from: account, value: mintPrice })
  
      return true
    } catch (error) {
      reportError(error)
    }
  }
  
//   const buyNFT = async ({ id, cost }) => {
//     try {
//       cost = window.web3.utils.toWei(cost.toString(), 'ether')
//       const contract = await getEtheriumContract()
//       const buyer = getGlobalState('connectedAccount')
  
//       await contract.methods
//         .payToBuy(Number(id))
//         .send({ from: buyer, value: cost })
  
//       return true
//     } catch (error) {
//       reportError(error)
//     }
//   }
  
  const updateNFT = async ({ id, cost }) => {
    try {
      cost = window.web3.utils.toWei(cost.toString(), 'ether')
      const contract = await getEtheriumContract()
      const buyer = getGlobalState('connectedAccount')
  
      await contract.methods.changePrice(Number(id), cost).send({ from: buyer })
    } catch (error) {
      reportError(error)
    }
  }

  const updateFlag = async (eventCategoryId) => {
    try {
      if(!ethereum) return alert('Please install Metamask')
      const tokenId = await isOwned(eventCategoryId)
      if (tokenId === -1) return false
      const contract = await getEtheriumContract()
      const buyer = getGlobalState('connectedAccount')

      await contract.methods.flagUsed(tokenId).send({from: buyer})
    }catch(error){
      reportError(error)
      return false
    }

    return true
  }
  
  const reportError = (error) => {
    setAlert(JSON.stringify(error), 'red')
    throw new Error('No ethereum object.')
  }
  
  export {
    getAllNFTs,
    connectWallet,
    mintNFT,
    // buyNFT,
    updateNFT,
    updateFlag,
    isWallectConnected,
  }