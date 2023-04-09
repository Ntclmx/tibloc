import React, { useEffect, useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import Axios from "axios";
import { WishlistCard } from "../../components";
import { UserContext } from '../MainApp/index'

const Wishlist = () => {
  const [events, setEvents] = useState([]);
  const { web3User } = useContext(UserContext);

  useEffect(() => {

    const userId = web3User;

    Axios.get(`http://127.0.0.1:4000/v1/wishlists/user/${userId}`)
      .then(async (result) => {
        const wishlists = result.data.wishlists;
        let arrEvents = [];

        for (const wishlist of wishlists) {
          const eventId = wishlist.eventId;

          try {
            const event = await Axios.get(
              `http://127.0.0.1:4000/v1/event/${eventId}`
            );
            console.log(event.data.event);

            arrEvents.push(event.data.event);
          } catch (e) {
            continue;
          }
        }

        setEvents(arrEvents);
      })
      .catch((err) => {
        console.log(err)
      });
  }, [web3User]);

  if (events.length !== 0) {
    return (
      <Row>
        <Col className='col-12 mb-3'>
          <h4>YOUR WISHLIST</h4>
        </Col>
        <Col className='col-12 mb-4'>
          <Row>
            {events.map(event => {
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
  } else {
    return (
      <Row>
        <Col className='col-12 mb-3'>
          <h4>YOUR WISHLIST</h4>
        </Col>
        <Col className='col-12 mb-4'>
          <div className="emptyDiv"></div>
        </Col>
      </Row>
    )
  }
}

export default Wishlist;
