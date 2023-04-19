import React, { useEffect, useState, useContext } from "react";
import { Row } from "react-bootstrap";
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


  return (
      <div className='minDiv'>
            <div className='d-flex align-items-center'>
            <h4>YOUR WISHLIST</h4>
                
            </div>
            {
                events.length > 0 ? (
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
                ) : (
                    <div className='text-center mt-5 pt-5'>
                        <p className='text-muted mt-5 pt-4'>No Wishlist</p>
                    </div>
                )
            }
      </div>
  )

}

export default Wishlist;
