import React, { useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './header.css'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Bookmark from '../../assets/header/bookmark.png';
import Plus from '../../assets/events/plus.png';
import Scan from '../../assets/header/scan.png';
import Trans from '../../assets/header/trans.png';
import Profile from '../../assets/header/profile.png';
import { Search } from 'react-bootstrap-icons';
import Web3 from "web3";
import { UserContext } from '../../pages/MainApp/index';
import QrScanner from 'react-qr-scanner'
import Axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import {
  setAlert,
  setLoading,
  setGlobalState
} from "../../config/Store/index";
import {updateFlag} from "../../config/Blockchain.Service";
import { useHistory } from "react-router-dom";

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { ethereum } = window;
  const [showQR, setShowQR] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [scanResult, setScanResult] = useState(false);
  const handleShowQr = () => setShowQR(true);
  const handleHideQr = () => setShowQR(false);

  window.web3 = new Web3(ethereum);
  const { web3User, setWeb3User } = useContext(UserContext);

  useEffect(() => {
    async function connectWallet() {
      console.log('Connecting');
      try {
        console.log('user',web3User);
        if (!ethereum) {
          console.log('please install metamask')
          setShowToast(true)
        }

        const account = await ethereum.request({ method: 'eth_requestAccounts' })
        setWeb3User(account[0])
        setGlobalState('connectedAccount', account[0].toLowerCase())

        Axios.get(`${process.env.REACT_APP_API_URL}/v1/admin/address/${account[0]}`)
          .then(result => {

            if (result.status === 200) {
              setIsAdmin(true);
            }


          })
          .catch(err => {
            console.log(err);
          })

      } catch (error) {
        console.log(error);
      }
    }

    connectWallet()
  }, [ethereum, setWeb3User]);

  const [url, setUrl] = useState('/events');

  const handleChange = (e) => {

    if (e.target.value !== '') {
      setUrl(`/events?events=${e.target.value}`)

    } else {
      setUrl(`/events`)
    }

  }

  const handleScanError = (error) => {
    console.log(error);
  }

  const handleClick = async () => {
    console.log('Click Connecting');

    try {
      if (!ethereum) {
        console.log('please install metamask')
        setShowToast(true)
      }

      console.log(ethereum.selectedAddress);
      const account = await ethereum.request({ method: 'eth_requestAccounts' })
      setWeb3User(account[0])

      Axios.get(`${process.env.REACT_APP_API_URL}/v1/admin/address/${account[0]}`)
        .then(result => {

          if (result.status === 200) {
            setIsAdmin(true);
          }


        })
        .catch(err => {
          console.log(err);
        })

    } catch (error) {
      console.log(error);
    }


  }

  const updateFlagging = async (categoryId) => {

    try {
      setLoading(true, "Please accept transaction in Metamask...")
      if(await updateFlag(categoryId)){
        setAlert('Scan Succeed!', 'green')
        console.log('Scan Success')
      } else {
        console.log('Scan Failed')
        setAlert('Scan Failed!', 'red')
      }
    } catch (error) {
      console.log(error)
    }
  
  }

  const textProfile = web3User === '' ? 'Connect Wallet' : `${web3User.substr(0, 5)}...${web3User.substr(-5)}`

  
  let buttonWishlist = <></>
  let buttonTransactions = <></>
  let buttonAdd = <></>
  let buttonQR = <></>
  let buttonProfile = <></>
  if (isAdmin)
  {
    buttonAdd = <a href="/create-event/events" className="ms-auto"><div ><Image src={Plus} className=" header-icon"></Image></div></a>

    if(web3User)
    {
      buttonWishlist = <a href="/wishlist"><div className="mx-3"><Image src={Bookmark} className=" header-icon"></Image></div></a>
      buttonTransactions = <a href="/transactions"><div className="ms-3"><Image src={Trans} className=" header-icon"></Image></div></a>  
      buttonQR = <div className="" onClick={handleShowQr}><Image src={Scan} className=" header-icon"></Image></div>
      buttonProfile =<Button className='ms-4 profileButton ' onClick={handleClick}><Image src={Profile} className=" header-icon-profile mb-1 me-3"></Image>{textProfile}</Button>
    } else {
      buttonProfile =<Button className='ms-auto profileButton ' onClick={handleClick}><Image src={Profile} className=" header-icon-profile mb-1 me-3"></Image>{textProfile}</Button>
    }
    
  } else {
    if(web3User)
    {
      buttonWishlist = <a href="/wishlist" ><div className=''><Image src={Bookmark} className=" header-icon"></Image></div></a>
      buttonTransactions = <a href="/transactions" className="ms-auto"><div className="ms-3"><Image src={Trans} className=" header-icon"></Image></div></a>  
      buttonQR = <div className="" onClick={handleShowQr}><Image src={Scan} className=" header-icon"></Image></div>
      buttonProfile =<Button className='ms-4 profileButton ' onClick={handleClick}><Image src={Profile} className=" header-icon-profile mb-1 me-3"></Image>{textProfile}</Button>
    } else {

      buttonProfile =<Button className='ms-auto profileButton ' onClick={handleClick}><Image src={Profile} className=" header-icon-profile mb-1 me-3"></Image>{textProfile}</Button>
    }
  }



  return (
    <div>
      <Modal show={showQR} onHide={handleHideQr} >
        <Modal.Header closeButton>
          <Modal.Title>Scan QR</Modal.Title>
        </Modal.Header>
        <QrScanner
          onError={handleScanError}
          onScan={(result, error) => {
            if (result) {
              console.log('result', result.text);
              setScanResult(result.text);
              console.log('variable scanResult',scanResult)
              updateFlagging(result.text);
            } if (!!error) {
              console.log(error)
            }
          }}
          delay={300}
          className='mx-3'
        />
        {`Result: ${scanResult}`}
      </Modal>
      <ToastContainer className="p-3 position-fixed" position={'top-end'} >
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000}>
          <Toast.Header>

            <strong className="me-auto">Alert</strong>
          </Toast.Header>
          <Toast.Body>You haven't installed Metamask in your browser yet, click here for the guide</Toast.Body>
        </Toast>
      </ToastContainer>
      <Navbar expand="lg" >
        <Container fluid className='my-2 justify-content-start'>
          <Navbar.Brand href="/" className="navbar-brand fw-bold px-2 header-logo">Tibloc.</Navbar.Brand>
          <Form className='text-center header-search m-0 p-0 d-flex'>
            <a href={url}><Button className='position-absolute headerSearchButton ms-2' ><Search></Search></Button></a>
            <Form.Control type="text" className='headerSearchText ps-5' placeholder='Search Here' onChange={e => handleChange(e)}></Form.Control>
          </Form>
          {buttonAdd}
          {buttonTransactions}
          {buttonWishlist}
          {buttonQR}
          {buttonProfile}  
        </Container>
      </Navbar>
    </div>
  )
}

export default Header