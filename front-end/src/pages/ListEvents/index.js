import React, { useEffect, useState } from 'react'
import { EventCard, EventFilter, EventSort } from '../../components'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

const ListEvents = (props) => {
  const allLocation = [
    { name: "Jakarta", checked: false },
    { name: "Bogor", checked: false },
    { name: "Depok", checked: false },
    { name: "Tangerang", checked: false },
  ]

  const allCategories = [

    { name: "Comedy", checked: false },
    { name: "Music", checked: false },
    { name: "Sport", checked: false },
    { name: "Fun&Games", checked: false },
  ]

  const [filter, setFilter] = useState('');
  const [locs, setLoc] = useState(allLocation);
  const [locsQuery, setLocQuery] = useState('');
  const [cats, setCat] = useState(allCategories);
  const [catsQuery, setCatQuery] = useState('');
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

  const updateLocationCheck = (index) => {

    setFilter('location');
    setLoc(
      locs.map((loc, currentIndex) =>
        currentIndex === index
          ? { ...loc, checked: !loc.checked }
          : loc
      )
    )
  }

  const updateLocationQuery = (loc) => {
    setFilter('location');
    setLocQuery(loc)
  }

  const updateCategoryCheck = (index) => {
    setFilter('category');
    setCat(
      cats.map((cat, currentIndex) =>
        currentIndex === index
          ? { ...cat, checked: !cat.checked }
          : cat
      )
    )
  }

  const updateCategoryQuery = (cat) => {
    setFilter('category');
    setCatQuery(cat)
  }

  const sortFunc = (sort) => {
    const search = props.location.search

    Axios.get(`http://127.0.0.1:4000/v1/events${search}?sort=${sort}`)
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
  }

  return (

    <Row>
      <Col className='col-3'>
        <EventFilter updateLocationCheck={updateLocationCheck} updateLocationQuery={updateLocationQuery} updateCategoryCheck={updateCategoryCheck} updateCategoryQuery={updateCategoryQuery} />
      </Col>
      <Col className='col-9'>
        <EventSort sortFunc={sortFunc}></EventSort>
        <Row className='justify-content-start'>
          {events.map(event => {
            console.log(typeof (event));
            return <EventCard
              key={event._id}
              eventLogo={`http://127.0.0.1:4000/${event.eventLogo}`}
              eventTitle={event.eventTitle}
              eventDate={event.eventDate}
              _id={event._id}
              eventOrganizer={event.eventOrganizer}
              eventAddress={event.eventAddress}
              eventCategory={event.eventCategory}
              locs={locs}
              locsQuery={locsQuery}
              catsQuery={catsQuery}
              cats={cats}
              filter={filter}
              dashboard={false}
            />
          })}
        </Row>
        <Pagination size="sm">{page}</Pagination>
      </Col>
    </Row>
  )
}

export default withRouter(ListEvents)