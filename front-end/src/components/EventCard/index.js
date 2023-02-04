import React from 'react';
import Card from 'react-bootstrap/Card';
import './eventCard.css';
import EventImg from '../../assets/events/event1.jpg'
import Image from 'react-bootstrap/Image';

const EventCard = () => {
  return (
    <Card className='event-card text-start shadow'>
      <Card.Header className='event-card-header d-flex'>
        <Image src={EventImg} className='event-card-promotor-image rounded-circle me-2' alt='promotor-img'/>
        <div className=''>
          Event Promotor
        </div>
      </Card.Header>
      <Card.Img className='event-card-image' variant="top" src={EventImg} alt='event' />
      <Card.Body>
        <Card.Title className='event-card-title pb-0 mb-0'>Event Title</Card.Title>
        <Card.Text className='event-card-price pt-0'>
          Rp 100.000
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default EventCard