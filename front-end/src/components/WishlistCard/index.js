import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import EventImg from '../../assets/events/event1.jpg'
import Image from 'react-bootstrap/Image';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';


const WishlistCard = (props) => {
    const [price, setPrice] = useState(0);
    const history = useHistory();
    const [org, setOrg] = useState('');

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_API_URL}/v1/event/${props._id}/categories`)
            .then(result => {
                const categories = result.data.categories;

                // console.log('test',categories);
                let finalPrice = 1000000000000;
                for (let category of categories) {
                    if (category.categoryPrice < finalPrice) {
                        finalPrice = category.categoryPrice;
                    }

                    setPrice(finalPrice);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [props]);

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_API_URL}/v1/organizer/${props.eventOrganizer}`)
            .then(result => {

                setOrg(result.data.organizer)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    // const formatter = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'IDR',
    // });

    // const totalPrice = formatter.format(price);
    return (
        <Col col='4' className='col-4 pb-3 d-flex justify-content-start align-items-start'>
            <Card className='created-event-card text-start shadow' onClick={() => history.push(`/event/${props._id}`)}>
                <Card.Header className='event-card-header d-flex'>
                    <Image src={`${process.env.REACT_APP_API_URL}/${org.organizerLogo}`} className='event-card-promotor-image rounded-circle me-2' alt='promotor-img' />
                    <div className=''>
                        {org.organizerName}
                    </div>
                </Card.Header>
                <Card.Img className='created-event-card-image' variant="top" src={props.eventLogo} alt='event' />
                <Card.Text className='position-absolute edit-event-card-date text-white py-1'>{props.eventDate}</Card.Text>
                <Card.Body>
                    <Row>
                        <Col className='col-10'>
                            <Card.Title className='event-card-title pb-0 mb-0'>{props.eventTitle}</Card.Title>
                            <Card.Text className='event-card-price pt-0'>
                                MATIC {price}
                            </Card.Text>

                        </Col>
                        <Col className='col-2 d-flex align-items-center' >
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default WishlistCard