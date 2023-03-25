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


const DetailTransaction = (props) => {
    const [trx, setTrx] = useState({});
    const [cat, setCat] = useState({});
    const [event, setEvent] = useState({});
    const [show, setShow] = useState(false);
    const [showTicket, setShowTicket] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseTicket = () => setShowTicket(false);
    const handleShowTicket = () => setShowTicket(true);

    useEffect(() => {
        const id = props.match.params.id;

        Axios.get(`http://127.0.0.1:4000/v1/transaction/${id}`)
            .then(result => {
                setTrx(result.data.transaction);

                const catId = result.data.transaction.categoryId;
                Axios.get(`http://127.0.0.1:4000/v1/category/${catId}`)
                    .then(result => {
                        setCat(result.data.category);

                        const eventId = result.data.category.eventId;
                        Axios.get(`http://127.0.0.1:4000/v1/event/${eventId}`)
                            .then(result => {
                                setEvent(result.data.event);
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }, [props])

    let ticketStatus = '';

    if (trx.ticketStatus) {
        ticketStatus = <div className='d-flex'><h5 className='detailTrxText text-uppercase mb-2 me-1'>ISSUED</h5><h5 className='detailTrxTextClick text-uppercase mb-2' onClick={handleShowTicket}>CLICK HERE</h5></div>

    }
    else {
        if (trx.paymentStatus === 'pending') {

            ticketStatus = <h5 className='detailTrxText text-uppercase mb-2 text-danger'>PENDING</h5>
        }
        else {

            ticketStatus = <h5 className='detailTrxText text-uppercase mb-2 text-danger'>ticket failed to issue</h5>
        }
    }

    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let newFormatDate = new Date(event.eventDate);
    newFormatDate = newFormatDate.toLocaleDateString("en-US", options);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
    });

    const totalPrice = formatter.format(trx.transactionAmount);

    let paymentStatusDiv = '';
    let paymentPayDiv = '';
    if (trx.paymentStatus === 'pending') {
        paymentStatusDiv =
            <>
                <Col className='col-3 '>
                    <h5 className='detailTrxText2 mb-2'>Expired at</h5>
                </Col>
                <Col className='col-9'>
                    <h5 className='detailTrxText text-uppercase mb-2'><Moment add={{ hours: 1 }} >{trx.createdAt}</Moment></h5>
                </Col>
            </>

        if (trx.paymentWith === 'gopay') {
            paymentPayDiv =
                <>
                    <Col className='col-3 '>
                        <h5 className='detailTrxText2 mb-2'>QR</h5>
                    </Col>
                    <Col className='col-9'>
                        <h5 className='detailTrxText text-uppercase mb-2'>CLICK HERE <QrCodeScan onClick={handleShow} className='mb-1'/></h5>
                    </Col>
                </>
        } else {
            paymentPayDiv =
                <>
                    <Col className='col-3 '>
                        <h5 className='detailTrxText2 mb-2'>Virtual Account</h5>
                    </Col>
                    <Col className='col-9'>
                        <h5 className='detailTrxText text-uppercase mb-2'>{trx.paymentVA}</h5>
                    </Col>
                </>

        }
    }

    if (event._id) {
        return (
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Payment QR</Modal.Title>
                    </Modal.Header>
                    <Image src={trx.paymentQR} className='detailTrxQR'></Image>
                </Modal>
                <Modal show={showTicket} onHide={handleCloseTicket}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ticket QR</Modal.Title>
                    </Modal.Header>
                    <a href={trx.ticketQRPath}><Image src={trx.ticketQRPath} className='detailTrxQR'></Image></a>
                </Modal>
                <Card>
                    <Card.Header className='detailTrxHead text-uppercase'>ID: {trx._id}</Card.Header>
                    <Row className='d-flex'>
                        <div className='col-6 justify-content-center my-3 detailTrxCol'>
                            <div className='ps-3 pe-2'>
                                <div className='d-flex'>
                                    <Image src={Circle} className='detailTrxCircle mt-1 me-3'></Image>
                                    <h3 className='detailTrxEvent'>EVENT</h3>

                                </div>
                                <div className='justify-content-center mb-3'>
                                    <Image src={`http://localhost:4000/${event.eventLogo}`} className='detailTrxImg'></Image>
                                </div>
                                <Row >
                                    <h4>{event.eventTitle}</h4>
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
                                        <p className='chooseTicketText'>{newFormatDate}</p>
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
                                        <div className='d-flex'>
                                            <Image src={Circle} className='detailTrxCircle mt-1 me-3'></Image>
                                            <h3 className='detailTrxEvent'>TICKET</h3>
                                        </div>
                                        <Row >
                                            <Col className='col-3 '>
                                                <h5 className='detailTrxText2 mb-2'>Category</h5>
                                            </Col>
                                            <Col className='col-9'>
                                                <h5 className='detailTrxText text-uppercase mb-2'>{cat.categoryName}</h5>
                                            </Col>
                                            <Col className='col-3 '>
                                                <h5 className='detailTrxText2  mb-2'>Status</h5>
                                            </Col>
                                            <Col className='col-9 mb-2 d-flex'>
                                                {ticketStatus}
                                            </Col>
                                        </Row>
                                    </Row>
                                </div>

                                <div>
                                    <div className='d-flex'>
                                        <Image src={Circle} className='detailTrxCircle mt-1 me-3'></Image>
                                        <h3 className='detailTrxEvent'>PAYMENT</h3>
                                    </div>

                                    <Row >
                                        <Col className='col-3 '>
                                            <h5 className='detailTrxText2 mb-2'>ID</h5>
                                        </Col>
                                        <Col className='col-9'>
                                            <h5 className='detailTrxText text-uppercase mb-2'>{trx._id}</h5>
                                        </Col>
                                        <Col className='col-3 '>
                                            <h5 className='detailTrxText2 mb-2'>Payment With</h5>
                                        </Col>
                                        <Col className='col-9'>
                                            <h5 className='detailTrxText text-uppercase mb-2'>{trx.paymentWith}</h5>
                                        </Col>
                                        <Col className='col-3 '>
                                            <h5 className='detailTrxText2 mb-2'>Amount</h5>
                                        </Col>
                                        <Col className='col-9'>
                                            <h5 className='detailTrxText text-uppercase mb-2'>{totalPrice}</h5>
                                        </Col>
                                        <Col className='col-3 '>
                                            <h5 className='detailTrxText2 mb-2'>Status</h5>
                                        </Col>
                                        <Col className='col-9'>
                                            <h5 className='detailTrxText text-uppercase mb-2'>{trx.paymentStatus}</h5>
                                        </Col>
                                        {paymentPayDiv}
                                        {paymentStatusDiv}
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