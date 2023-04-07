import React, { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import eventImage from '../../assets/carousel/Home1.png'
import './detailEvent.css'
import { DetailEventCalendar, DetailEventTabs } from '../../components';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Circle from '../../assets/events/circle.png';

const DetailEvent = (props) => {
  const [event, setEvent] = useState({});

  useEffect(() => {
    const id = props.match.params.id;
    console.log(id);

    Axios.get(`http://127.0.0.1:4000/v1/event/${id}`)
      .then(result => {
        console.log(result.data.event);
        setEvent(result.data.event);
      })
      .catch(err => {
        console.log(err);
      })
  }, [props])

  if (event._id) {
    return (
      <div>
        <Breadcrumb className='pt-2 ps-3 detailEventBreadcrumb'>
          <Breadcrumb.Item href="/home" >
            <p className='detailEventBreadcrumbText'>Home</p>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/events" className='detailEventBreadcrumbText'>
            Events
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{event.eventTitle}</Breadcrumb.Item>
        </Breadcrumb>

        <Image src={`http://localhost:4000/${event.eventLogo}`} className='detailEventImage' alt='test' />
        <div className="detailEventGrey"></div>

        <div className="d-flex justify-content-center detailImageDivLogo">
          <Image src={Circle} className='detailEventImage2 shadow'></Image>
          {/* <Image src={eventImage} className='detailEventImage2 shadow'></Image> */}
        </div>


        <Container className='my-5 pt-5'>
          <h1>{event.eventTitle}</h1>
          <Row className='pt-3'>
            <Col className='col-8 detailEventDesc'>
              <DetailEventTabs eventDescription={event.eventDescription} eventTnc={event.eventTnc} />
            </Col>
            <Col className='col-4 detailEventCalendar'>
              <DetailEventCalendar eventAddress={event.eventAddress} _id={event._id} />
            </Col>
          </Row>
        </Container>


      </div>
    );
  } else {
    <p>Loading...</p>
  }
}

export default withRouter(DetailEvent)