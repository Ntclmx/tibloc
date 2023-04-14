import React, { useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './header.css'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CalendarWeek from '../../assets/header/cal1.png';
import Bookmark from '../../assets/header/bookmark.png';
import Wallet from '../../assets/header/wallet.png';
import Scan from '../../assets/header/scan.png';
import Profile from '../../assets/header/profile.png';
import { Search } from 'react-bootstrap-icons';
import Web3 from "web3";
import { UserContext } from '../../pages/MainApp/index';
import { QrReader } from 'react-qr-reader';

const Header = () => {
  const { ethereum } = window;
  const [showQR, setShowQR] = useState(false);
  const [scanResult, setScanResult] = useState(false);

  const handleShowQr = () => setShowQR(true);
  const handleHideQr = () => setShowQR(false);

  window.web3 = new Web3(ethereum);

  console.log('web3', window.web3)

  const { web3User, setWeb3User } = useContext(UserContext);

  useEffect(() => {
    async function connectWallet() {
      console.log('Connecting');
      try {
        if (!ethereum) console.log('please install metamask')

        const account = await ethereum.request({ method: 'eth_requestAccounts' })
        setWeb3User(account[0])

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

  const handleScan = (result) => {
    if(result)
    {
      console.log('result', result);
      setScanResult(result);

    }
  }

  const textProfile = web3User === '' ? 'Connect Wallet' : `${web3User.substr(0, 5)}...${web3User.substr(-5)}`
  return (
    <>
      <Modal show={showQR} onHide={handleHideQr}>
        <Modal.Header closeButton>
          <Modal.Title>Scan QR</Modal.Title>
        </Modal.Header>
        <QrReader
          onError={handleScanError}
          onResult={handleScan}
          delay={300}
          className='mx-3'
        />
        {`Result: ${scanResult}`}
      </Modal>
      <Navbar expand="lg" className='header-top'>
        <Container fluid className='my-2 justify-content-start'>
          <Navbar.Brand href="/dashboard-guest" className="navbar-brand text-light fw-bold text-uppercase px-2 header-logo">TIBLOC.</Navbar.Brand>
          <Form className='text-center header-search m-0 p-0 d-flex'>
            <a href={url}><Button className='position-absolute headerSearchButton ms-2' ><Search></Search></Button></a>
            <Form.Control type="text" className='headerSearchText ps-5' placeholder='Search Here' onChange={e => handleChange(e)}></Form.Control>
          </Form>
          <a href="/transactions" className="ms-auto">
            <div >
              <Image src={CalendarWeek} className=" header-icon"></Image>
            </div>
          </a>
          <a href="/wishlist">
            <div className="mx-3">
              <Image src={Bookmark} className=" header-icon"></Image>
            </div>
          </a>

          <div className="me-3" onClick={handleShowQr}>
            <Image src={Scan} className=" header-icon"></Image>
          </div>

          <Button className='ms-2 profileButton '>
            <Image src={Profile} className=" header-icon-profile mb-1 me-3"></Image>
            {textProfile}
          </Button>
        </Container>
      </Navbar>
    </>
  )
}

export default Header