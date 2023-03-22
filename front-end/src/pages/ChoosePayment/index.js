import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { GeoAltFill, Calendar2Fill, ClockFill } from 'react-bootstrap-icons';
import { withRouter } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PaymentTypeCard from '../../components/PaymentTypeCard';
import { useHistory } from 'react-router-dom';

const ChoosePayment = (props) => {
    const history = useHistory();
    const [event, setEvent] = useState({});
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [payment, setPayment] = useState('-');
    const [choosePaymentId, setChoosePaymentId] = useState('-');
    const [paymentTypes, setPaymentType] = useState('');

    useEffect(() => {
        const id = props.match.params.id;
        const category = props.location.state.category;
        const categoryId = props.location.state.id;
        const price = props.location.state.price;

        setPrice(price);
        setCategory(category);
        setCategoryId(categoryId);

        Axios.get(`http://127.0.0.1:4000/v1/event/${id}`)
            .then(result => {
                setEvent(result.data.event);
            })
            .catch(err => {
                console.log(err);
            })
    }, [props])

    useEffect(() => {

        Axios.get(`http://127.0.0.1:4000/v1/paymentType`)
            .then(result => {
                console.log(result.data.paymentType);
                setPaymentType(result.data.paymentType);
            })
            .catch(err => {
                console.log(err);
            })
    }, [props])

    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let newFormatDate = new Date(event.eventDate);
    newFormatDate = newFormatDate.toLocaleDateString("en-US", options);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
    });

    const pay = () => {
        const transaction = {
            "categoryId": categoryId,
            "userId": "u123",
            "transactionAmount": price,
            "paymentWith": payment
        };

        Axios.post('http://127.0.0.1:4000/v1/transaction', transaction)
            .then(res => {

                console.log(res);
            })
            .catch(err => {
                console.log(err.response.data);
            })

        history.push('/events');
    }

    const totalPrice = formatter.format(price);
    let button = ''

    if (payment === '-') {
        button = <div className='mx-1 px-2 mb-3 d-grid'><Button variant="primary" size="lg" disabled >Choose Payment</Button></div>
    }
    else {
        button = <div className='mx-1 px-2 mb-3 d-grid'><Button variant="primary" size="lg" onClick={pay} >Choose Payment</Button></div>
    }

    const finalPaymentFunc = (paymentName, id) => {
        setPayment(paymentName);
        setChoosePaymentId(id)

    }

    const uppercasePayment = payment.toUpperCase();

    if (paymentTypes[0]) {
        return (
            <div>
                <Row className='mb-5'>
                    <Col className='col-7'>

                        <h1>{event.eventTitle}</h1>
                        <div className='chooseTicketSmallDiv mb-4'>
                            <Row >
                                <Col className='col-1'>
                                    <GeoAltFill className='mb-1' />
                                </Col>
                                <Col className='col-11'>
                                    <p className='chooseTicketText'>{event.eventAddress}</p>
                                </Col>
                                <Col className='col-1'>
                                    <Calendar2Fill className='mb-1 me-2' />
                                </Col>
                                <Col className='col-11'>
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

                        <Row>
                            <h5>Virtual Account</h5>
                            {paymentTypes.map(paymentType => {
                                if (paymentType.paymentTypeKind === 'va') {
                                    return <PaymentTypeCard
                                        key={paymentType._id}
                                        paymentTypeKind={paymentType.paymentTypeKind}
                                        paymentTypeName={paymentType.paymentTypeName}
                                        paymentTypeLogo={`http://127.0.0.1:4000/${paymentType.paymentTypeLogo}`}
                                        _id={paymentType._id}
                                        finalPaymentFunc={finalPaymentFunc}
                                        choosePaymentId={choosePaymentId}
                                    />
                                }
                            })}
                        </Row>
                        <Row className='mt-3'>
                            <h5>E-Wallet</h5>
                            {paymentTypes.map(paymentType => {
                                if (paymentType.paymentTypeKind === 'e-wallet') {
                                    return <PaymentTypeCard
                                        key={paymentType._id}
                                        paymentTypeKind={paymentType.paymentTypeKind}
                                        paymentTypeName={paymentType.paymentTypeName}
                                        paymentTypeLogo={`http://127.0.0.1:4000/${paymentType.paymentTypeLogo}`}
                                        _id={paymentType._id}
                                        finalPaymentFunc={finalPaymentFunc}
                                        choosePaymentId={choosePaymentId}
                                    />
                                }
                            })}
                        </Row>

                    </Col>
                    <Col className='col-4 ms-5'>
                        <Card className='text-start mb-3'>
                            <Card.Header className='catCardHeader d-flex'>
                                <Card.Title className=' pb-0 mb-0'>Detail</Card.Title>
                            </Card.Header>
                            <Card.Body className='p-0'>
                                <Card.Text className='muted pt-2 mt-1 ms-3'>
                                    <p className='paymentCard'>Category  :  {category}</p>
                                    <p className='paymentCard'>Total     :  {totalPrice}</p>
                                    <p className='paymentCard'>Payment     :  {uppercasePayment}</p>
                                </Card.Text>
                                <div className='mx-2'>
                                    {button}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(ChoosePayment)