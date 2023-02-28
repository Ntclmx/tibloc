import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import './eventCard.css';
import EventImg from '../../assets/events/event1.jpg'
import Image from 'react-bootstrap/Image';
import { useHistory } from 'react-router-dom';

const EventCard = (props) => {
  const history = useHistory();

  return (
    <Col  col='4' className='col-4 pb-3 d-flex justify-content-center align-items-center'>
        <Card className='event-card text-start shadow' onClick={() => history.push(`/event/${props._id}`)}>
          <Card.Header className='event-card-header d-flex'>
            <Image src={EventImg} className='event-card-promotor-image rounded-circle me-2' alt='promotor-img'/>
            <div className=''>
              Event Promotor
            </div>
          </Card.Header>
          <Card.Img className='event-card-image' variant="top" src={props.eventLogo} alt='event' />
          <Card.Text className='position-absolute event-card-date text-white py-1'>{props.eventDate}</Card.Text>
          <Card.Body>
            <Card.Title className='event-card-title pb-0 mb-0'>{props.eventTitle}</Card.Title>
            <Card.Text className='event-card-price pt-0'>
              Rp 100.000
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
  )
}

export default EventCard