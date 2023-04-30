import { createGlobalState } from 'react-hooks-global-state'

const {setGlobalState, useGlobalState, getGlobalState} = createGlobalState({
  modal: 'scale-0',
  updateModal: 'scale-0',
  showModal: 'scale-0',
  alert: {show: false, msg: '', color:''},
  loading: {show: false, msg:''},
  connectedAccount: '',
  nft: null,
  nfts: [],
  nftsOwned: [],
  transactions: [],
  contract: null,
})

const setAlert = (msg, color) => {
  console.log("set alert")
  setGlobalState('loading', false)
  setGlobalState('alert', {show: true, msg, color})
  setTimeout(() => {
    setGlobalState('alert', {show: false, msg:'', color})
  }, 6000)
}

const setLoading = (show, msg) => {
  setGlobalState('alert', {show: false})
  setGlobalState('loading', {show: show, msg: msg})
}

const setLoadingTO = (show, msg) => {
  setGlobalState('alert', {show: false})
  setGlobalState('loading', {show: show, msg: msg})
  setTimeout(() => {
    setGlobalState('loading', {show: false, msg:''})
  }, 4000)
}

const setLoadingMsg = (msg) => {
  const loading = getGlobalState('loading')
  setGlobalState('loading', {...loading, msg})
}

const truncate = (text, startChars, endChars, maxLength) => {
  if(text.length > maxLength){
    let start = text.substring(0, startChars)
    let end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength){
      start = start + '.'
    }
    return start + end
  }
  return text
}

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  setAlert,
  setLoadingMsg,
  setLoading,
  setLoadingTO,
  truncate
}