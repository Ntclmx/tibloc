import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Row from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap';
import { CreatedEventCard } from '../../components';

const ListCreatedEvents = () => {
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
        <Row>
            <Col className='col-12 mb-3'>
                <h2>Created Events</h2>
            </Col>
            <Col className='col-12 mb-3'>
                <Row>
                    {events.map(event => {
                        console.log(typeof (event));
                        return <CreatedEventCard
                            key={event._id}
                            eventLogo={`http://127.0.0.1:4000/${event.eventLogo}`}
                            eventTitle={event.eventTitle}
                            eventDate={event.eventDate}
                            _id={event._id}
                            eventOrganizer = {event.eventOrganizer}
                        />
                    })}
                </Row>
            </Col>
        </Row>
    )
}

export default ListCreatedEvents