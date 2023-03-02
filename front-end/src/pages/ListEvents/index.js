import React, { useEffect, useState } from 'react'
import { EventCard, EventFilter, EventSort } from '../../components'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Axios from 'axios';

const ListEvents = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    Axios.get('http://127.0.0.1:4000/v1/events')
    .then(result => {
      const responseAPI = result.data;
      setEvents(responseAPI.events);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <Container>
      <Row>
        <Col className='col-3'>
          <EventFilter/>
        </Col>
        <Col className='col-9'>
          <EventSort></EventSort>
          <Row>
                {events.map(event => {
                  console.log(typeof(event));
                  return <EventCard 
                    key={event._id}
                    eventLogo = {`http://127.0.0.1:4000/${event.eventLogo}`}
                    eventTitle = {event.eventTitle}
                    eventDate = {event.eventDate}
                  />
                })}
              <div>Pagination</div>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default ListEvents