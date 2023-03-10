import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import Axios from 'axios';
import { WishlistCard } from '../../components';

const Wishlist = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const userId = '123';

        Axios.get(`http://127.0.0.1:4000/v1/wishlists/user/${userId}`)
            .then(async result => {

                const wishlists = result.data.wishlists;
                let arrEvents = [];

                for (const wishlist of wishlists) {
                    const eventId = wishlist.eventId;


                    try {
                        const event = await Axios.get(`http://127.0.0.1:4000/v1/event/${eventId}`);
                        console.log(event.data.event);

                        arrEvents.push(event.data.event);
                    }
                    catch {
                        continue;
                    }
                }

                setEvents(arrEvents);

            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    if(events)
    {
        console.log(events);
        return (
            <Row>
                <Col className='col-12 mb-3'>
                    <h2>Your Wishlist</h2>
                </Col>
                <Col className='col-12 mb-4'>
                    <Row>
                        {events.map(event => {
                            console.log(typeof (event));
                            return <WishlistCard
                                key={event._id}
                                eventLogo={`http://127.0.0.1:4000/${event.eventLogo}`}
                                eventTitle={event.eventTitle}
                                eventDate={event.eventDate}
                                _id={event._id}
                                eventOrganizer={event.eventOrganizer}
                            />
                        })}
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default Wishlist