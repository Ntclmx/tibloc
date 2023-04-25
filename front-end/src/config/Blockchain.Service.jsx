import Web3 from "web3";
import abi from '../../src/constants/abi/TiblocNFT.json';
import { setGlobalState, getGlobalState, setAlert } from "./Store";
import BigNumber from "bignumber.js";
import network from '../../src/constants/networkMapping.json';

const {ethereum} = window;
console.log('Ethereum')
console.log(ethereum)
window.web3 = new Web3(ethereum)
window.web3 = new Web3(window.web3.currentProvider)

const getEtheriumContract = async () => {
  console.log(`start process getEtheriumContract blockchain service`)
    const connectedAccount = getGlobalState('connectedAccount')
    console.log(connectedAccount)

    if (connectedAccount) {
      console.log(`Account connected!`)
      console.log(ethereum)
      console.log(window.web3)
      console.log(window.web3.eth.net.getId())
      const web3 = window.web3;
      const networkId = await web3.eth.net.getId().then(console.log);
      // console.log('test')
      // const networkss = network.toString();
      // console.log(networkss)
      // const test = JSON.parse(networkss);
      console.log('haha')
      // console.log(test)
      // const networkData = abi.networks[networkId];
      const networkData = '0x9437Ef7a171fc528114900018f6b7960a00B5977';
      // console.log(networkData.TiblocNFT)
      if (networkData) {
        console.log(networkData)
        const contract = new web3.eth.Contract(abi, networkData)
        console.log('done getEtheriumContract')
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
      console.log('Start get All Nfts')
      if (!ethereum) return alert('Please install Metamask')

      await isWallectConnected()
      const contract = await getEtheriumContract()
      console.log('start call')
      const nfts = await contract.methods.getAllNFTs().call()
    //   const transactions = await contract.methods.getAllTransactions().call()
  
      setGlobalState('nfts', structuredNfts(nfts))
      console.log('done call')
    //   setGlobalState('transactions', structuredNfts(transactions))
    } catch (error) {
      reportError(error)
    }
  }

  const getAllNftsOwnedBy = async () => {
    try{
      console.log('Start Get All Nfts Owned')
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
      console.log(`Start isOwned...`)
      if(!ethereum) return alert('Please install Metamask')
      await getAllNftsOwnedBy()
      const nftsOwned = getGlobalState('nftsOwned')
      console.log('nftsOwned: ',nftsOwned)
      for(const nft of nftsOwned){
        console.log(nft.eventCategoryId, eventCategoryId)
        if(nft.eventCategoryId === eventCategoryId) return nft.tokenId
      }
    } catch (error) {
      reportError(error);
      return -1;
    }
    return -1
  }
  
  const mintNFT = async ( title, description, tokenURI, salesPrice, eventCategoryId, eventDate ) => {
    try {
      // salesPrice = window.web3.utils.toWei(salesPrice.toString(), 'ether')
      console.log(`start process mintNFT blockchain service`)
      const contract = await getEtheriumContract()
      const account = getGlobalState('connectedAccount')
      console.log(typeof(salesPrice), salesPrice)
      console.log(typeof((salesPrice + 0.001).toString()),(salesPrice + 0.001).toString())
      // console.log(Number((0.001)).toFixed(18))p
      // console.log(window.web3.BigNumber.from(2.0))
      console.log('test');
      // const mintPrice = window.web3.utils.toWei((salesPrice + 0.001).toString(), 'ether');
      // const tempNum = BigInt(10)
      // console.log(tempNum.c[0], typeof tempNum.c[0], tempNum)
      // console.log(typeof 1000000000000000000n)
      
      // const price =  (new BigNumber(salesPrice)).c[0] * 1000000000000000000n;
      const price = 1000000000000000000n;
      console.log(typeof price)
      const mintPrice = window.web3.utils.toWei((salesPrice+0.001).toString(), 'ether');
      console.log(typeof mintPrice)
  
      await contract.methods.payToMint(title, description, tokenURI, '1', eventCategoryId, eventDate).send({ from: account, value: mintPrice })

      console.log(`done process mintNFT blockchain service`)
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
      console.log('Start Update Flag...')
      if(!ethereum) return alert('Please install Metamask')

      console.log('event cat idddd',eventCategoryId)
      const tokenId = await isOwned(eventCategoryId)
      console.log('tokenId', tokenId)
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
    console.log(error);
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