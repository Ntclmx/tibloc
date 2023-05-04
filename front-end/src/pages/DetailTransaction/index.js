import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './detailTrx.css';
import { GeoAltFill, Calendar2Fill, ClockFill, QrCodeScan } from 'react-bootstrap-icons';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import Circle from '../../assets/events/circle.png';
import Modal from 'react-bootstrap/Modal';
import Moment from 'react-moment';
import { getAllNftsOwnedBy } from '../../config/Blockchain.Service';
import moment from 'moment';


const DetailTransaction = (props) => {
    const [nft, setNft] = useState({});
    const [cat, setCat] = useState({});
    const [event, setEvent] = useState({});
    const [show, setShow] = useState(false);
    const [showTicket, setShowTicket] = useState(false);
    const [mintDate, setMintDate] = useState('');
    const [flagDate, setFlagDate] = useState('');

    // console.log(props.location.state)
    useEffect(() => {

        console.log('detail', props.location.state.nft)
        setEvent(props.location.state.event)
        setCat(props.location.state.category)
        setNft(props.location.state.nft)

        //timestamp to date
        const mintDate = nft.mintDate === "0" ? "-" : (moment.unix(nft.mintDate))._d
        const flagDate = nft.flagDate === "0" ? "-" : (moment.unix(nft.flagDate))._d;

        setMintDate(mintDate.toString())
        setFlagDate(flagDate.toString())

        // console.log(moment.unix(nft.mintDate))
        // console.log()
    })

    console.log(mintDate)
    console.log(flagDate)




    if (event._id) {
        return (
            <>
                <Card className='detailTrx'>
                    <Card.Header className='detailTrxHead text-uppercase'><h5>{event.eventTitle}</h5></Card.Header>
                    <Row className='d-flex'>
                        <div className='col-6 justify-content-center my-3 detailTrxCol'>
                            <div className='ps-3 pe-2'>
                                {/* <div className='d-flex'>
                                    <Image src={Circle} className='detailTrxCircle mt-1 me-3'></Image>
                                    <h3 className='detailTrxEvent'>EVENT</h3>

                                </div> */}
                                <div className='justify-content-center mb-3'>
                                    <Image src={`${process.env.REACT_APP_API_URL}/${event.eventLogo}`} className='detailTrxImg'></Image>
                                </div>
                                <Row >
                                    <Col className='col-1 '>
                                        <GeoAltFill className='mb-1' />
                                    </Col>
                                    <Col className='col-11 mb-2'>
                                        <p className='chooseTicketText'>{event.eventAddress}</p>
                                    </Col>
                                    <Col className='col-1 '>
                                        <Calendar2Fill className='mb-1 me-2' />
                                    </Col>
                                    <Col className='col-11 mb-2'>
                                        <p className='chooseTicketText'>{event.eventDate}</p>
                                    </Col>
                                    <Col className='col-1'>
                                        <ClockFill className='mb-1 me-2' />
                                    </Col>
                                    <Col className='col-11'>
                                        <p className='chooseTicketText'>{event.eventTime}</p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className='col-6 justify-content-center my-3'>
                            <div className='ps-3 pe-2'>
                                <div className='detailTrxSmallDiv mb-4'>
                                    <Row className='mt-3 pb-3'>
                                        {/* <div className='d-flex'>
                                            <Image src={Circle} className='detailTrxCircle mt-1 me-3'></Image>
                                            <h3 className='detailTrxEvent'>TICKET</h3>
                                        </div> */}
                                        <Row >
                                            <Col className='col-4'>
                                                <h5 className='detailTrxText2 mb-2'>Category</h5>
                                            </Col>
                                            <Col className='col-8'>
                                                <h5 className='detailTrxText text-uppercase mb-2'>{cat.categoryName}</h5>
                                            </Col>
                                            <Col className='col-4 '>
                                                <h5 className='detailTrxText2  mb-2'>Description</h5>
                                            </Col>
                                            <Col className='col-8 mb-2 '>
                                                <h5 className='detailTrxText2 mb-2'>{cat.categoryDescription}</h5>

                                            </Col>
                                        </Row>
                                    </Row>
                                </div>

                                <div className='detailTrxSmallDiv mb-4'>
                                    <Row className='mt-3 pb-3'>
                                        <Col className='col-4 '>
                                            <h5 className='detailTrxText2 mb-2'>Mint Date</h5>
                                        </Col>
                                        <Col className='col-8'>
                                            {/* <h5 className='detailTrxText text-uppercase mb-2'>{nft.mintDate}</h5> */}
                                            <h5 className='detailTrxText2 mb-2'>{mintDate.toString()}</h5>
                                        </Col>
                                        <Col className='col-4 '>
                                            <h5 className='detailTrxText2 mb-2'>Status</h5>
                                        </Col>
                                        <Col className='col-8'>
                                            {nft.isUsed ? <h5 className='text-uppercase mb-2 trxCardGradText-True'>Used</h5> : <h5 className='text-uppercase mb-2 detailTrxText'>Not Used</h5>}

                                        </Col>
                                        <Col className='col-4 '>
                                            <h5 className='detailTrxText2 mb-2'>Date Used</h5>
                                        </Col>
                                        <Col className='col-8'>
                                            <h5 className='detailTrxText2 mb-2'>{flagDate}</h5>
                                        </Col>

                                    </Row>

                                </div>
                                <div>
                                    <Row >
                                        
                                        <h5 className='detailTrxText2 mb-4'>Import NFT to Metamask with Detail:</h5>
                                        
                                        <Col className='col-4 '>
                                            <h5 className='detailTrxText2 mb-2'>Contract Address</h5>
                                        </Col>
                                        <Col className='col-8'>
                                            <h5 className='detailTrxText text-uppercase mb-2'>{nft.flagDate}</h5>

                                        </Col>
                                        <Col className='col-4 '>
                                            <h5 className='detailTrxText2 mb-2'>TokenID</h5>
                                        </Col>
                                        <Col className='col-8'>
                                            <h5 className='detailTrxText text-uppercase mb-2'>{nft.tokenId}</h5>
                                        </Col>

                                    </Row>

                                </div>

                            </div>
                        </div>
                    </Row>
                </Card>
            </>
        )
    }
}

export default withRouter(DetailTransaction)
