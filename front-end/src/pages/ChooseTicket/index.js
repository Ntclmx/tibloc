import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import './chooseTicket.css';
import { GeoAltFill, Calendar2Fill, ClockFill } from 'react-bootstrap-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CategoryCard } from '../../components';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ChooseTicket = (props) => {
    const [categories, setCategory] = useState({});
    const [event, setEvent] = useState({});

    const [price, setPrice] = useState(0);

    useEffect(() => {
        const id = props.match.params.id;

        Axios.get(`http://127.0.0.1:4000/v1/event/${id}`)
            .then(result => {
                console.log(result.data.event);
                setEvent(result.data.event);
            })
            .catch(err => {
                console.log(err);
            })
    }, [props])

    useEffect(() => {
        const id = props.match.params.id;

        Axios.get(`http://127.0.0.1:4000/v1/event/${id}/categories`)
            .then(result => {
                console.log(result.data.categories);
                setCategory(result.data.categories);
            })
            .catch(err => {
                console.log(err);
            })
    }, [props])

    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let newFormatDate = new Date(event.eventDate);
    newFormatDate = newFormatDate.toLocaleDateString("en-US", options);

    const showNum = (e, catPrice) => {
        console.log(e, catPrice);
        let totalPrice = 0;
        totalPrice = price + (e * catPrice);

        setPrice(totalPrice);
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
    });

    const totalPrice = formatter.format(price);

    if (categories[0]) {
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

                        {categories.map(category => {
                            console.log(typeof (category));
                            return <CategoryCard
                                key={category._id}
                                categoryName={category.categoryName}
                                categoryPrice={category.categoryPrice}
                                categoryStock={category.categoryStock}
                                categoryDescription={category.categoryDescription}
                                _id={category._id}
                                showNum={showNum}
                            />
                        })}

                    </Col>
                    <Col className='col-4 ms-5'>
                        <Card className='text-start mb-3'>
                            <Card.Header className='catCardHeader d-flex'>
                                <Card.Title className=' pb-0 mb-0'>Detail</Card.Title>
                            </Card.Header>
                            <Card.Body className='p-0'>
                                <Card.Text className='muted pt-2 mt-1 ms-3'>
                                    <p className='paymentCard'>Total  :  {totalPrice}</p>
                                </Card.Text>
                                <div className='mx-2 d-grid'>

                                    <Button variant="primary" size="lg" className='mx-2 px-2 mb-3' href={`/event/${props.match.params._id}/categories`}>
                                        Choose Payment
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
    else <p>Loading...</p>
}

export default withRouter(ChooseTicket)