import React, { useEffect, useState } from 'react'
import { EventCard, EventFilter, EventSort } from '../../components'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

const ListEvents = (props) => {

  const [events, setEvents] = useState([]);
  const [page, setPage] = useState('');

  useEffect(() => {
    const search = props.location.search

    Axios.get(`http://127.0.0.1:4000/v1/events${search}`)
      .then(result => {
        const responseAPI = result.data;
        setEvents(responseAPI.events);

        const activePage = responseAPI.current_page;
        const totalPage = Math.ceil(responseAPI.total_data / responseAPI.per_page);

        let items = [];

        for (let number = 1; number <= totalPage; number++) {
          items.push(
            <Pagination.Item key={number} active={number === activePage}>
              {number}
            </Pagination.Item>,
          );
        }

        setPage(items);
      })
      .catch(err => {
        console.log(err);
      })
  }, [props]);

  return (

    <Row>
      <Col className='col-3'>
        <EventFilter />
      </Col>
      <Col className='col-9'>
        <EventSort></EventSort>
        <Row>
          {events.map(event => {
            console.log(typeof (event));
            return <EventCard
              key={event._id}
              eventLogo={`http://127.0.0.1:4000/${event.eventLogo}`}
              eventTitle={event.eventTitle}
              eventDate={event.eventDate}
              _id={event._id}
              eventOrganizer={event.eventOrganizer}
            />
          })}
        </Row>
        <Pagination size="sm">{page}</Pagination>
      </Col>
    </Row>
  )
}

export default withRouter(ListEvents)