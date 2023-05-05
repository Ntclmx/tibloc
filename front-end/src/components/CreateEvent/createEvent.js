import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import './createEvent.css';
import { Image } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

const CreateEventComp = (props) => {


  const history = useHistory();
  const [isUpdate, setIsUpdate] = useState(false);
  const [eventOrganizers, setEventOrganizers] = useState([]);

  const [event, setEvent] = useState({
    eventTitle: '',
    eventOrganizer: '',
    eventDate: '',
    eventTime: '',
    eventDescription: '',
    eventAddress: '',
    eventTnc: '',
    eventCategory: '',
    eventLogo: '',
  });

  useEffect(() => {

    const eventId = props.match.params.id;
    if (eventId) {
      setIsUpdate(true);
      Axios.get(`${process.env.REACT_APP_API_URL}/v1/event/${eventId}`)
        .then(result => {
          setImagePreview(`${process.env.REACT_APP_API_URL}/${result.data.event.eventLogo}`);
          setEvent(result.data.event);
        })
        .catch(err => {
          console.log(err);
        })
    } else if (Object.keys(props.event).length !== 0) {
      setEvent(props.event);
      if (props.event.eventLogo)
      {
        setImagePreview(URL.createObjectURL(props.event.eventLogo));

      }
    }
  }, [props]);

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  }

  const imageChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.files[0] });
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  }

  const submitButton = (e) => {
    e.preventDefault();
    console.log(event);
    props.updateEvent(event);
    if(isUpdate) {
      const eventId = props.match.params.id;
      history.push(`/edit-event/tickets/${eventId}`);
    } else {
      
      history.push('/create-event/tickets');
    }
  };

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/v1/organizers`)
        .then(result => {
          console.log(result);
          setEventOrganizers(result.data.organizer)
        })
        .catch(err => {
          console.log(err);
        })
  }, [])

  // const eventOrganizers = ['Groovy Event Organizer', 'The BIG Organizer', 'Dream Flavours Celebration'];
  const eventCategories = ['Comedy', 'Music', 'Sport', 'Fun&Games'];

  return (
    <div className='mb-5'>
      <div className='justify-content-center align-items-center text-center'>
        <h1 className='pt-2 pb-4'>{isUpdate ? 'Update Event' : "Create Event"}</h1>
      </div>
      <Card className='card-create-event'>
        <Card.Body>
          <Form className="input-form px-3 pt-4 pb-3">
            <Form.Group as={Row} className="mb-3" controlId="eventOrganizer">
              <Form.Label column sm={2}>Organizer</Form.Label>
              <Col sm={4}>
                <Form.Select className="form-select-style" name="eventOrganizer" value={event.eventOrganizer} onChange={handleChange}>
                  <option >Enter your event organizer here</option>
                  {eventOrganizers.map(eventOrganizer => {
                    return <option className='textBlack' value={eventOrganizer._id}>{eventOrganizer.organizerName}</option>
                  })}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="eventTitle">
              <Form.Label column sm={2}>Title</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="eventTitle"
                  placeholder="Enter your event event title here"
                  autoComplete="off"
                  value={event.eventTitle}
                  onChange={handleChange}
                  className='form-control-create-event'
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="form-group files color pb-3 " controlId='eventLogo'>
              <Form.Label column sm={2}>Logo</Form.Label>
              <Col sm={10}>
                <Card className='justify-content-center align-items-center form-control-create-event '>
                  <Form.Control
                    type="file"
                    className="form-control-create-event create-event-upload-image"
                    name="eventLogo"
                    onChange={imageChange}
                  />

                  {imagePreview ? (
                    <img src={imagePreview} className="create-event-image p-2" alt='event_logo'></img>
                  ) : (
                    <div>
                      <Image color='grey' className='position-absolute top-50 start-50 translate-middle header-icon'></Image>
                    </div>
                  )}
                </Card>
              </Col>
            </Form.Group>
            <Row>
              <Col sm={6}>
                <Form.Group as={Row} className="mb-3" controlId="eventDate">
                  <Form.Label column sm={4}>Date</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="date"
                      name="eventDate"
                      placeholder="Enter your event event date here"
                      autoComplete="off"
                      value={event.eventDate}
                      onChange={handleChange}
                      className='form-control-create-event'
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group as={Row} className="mb-2" controlId="eventTime">
                  <Form.Label column sm={3}>Start Time</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="time"
                      name="eventTime"
                      placeholder="Enter your event start time here"
                      autoComplete="off"
                      value={event.eventTime}
                      onChange={handleChange}
                      className='form-control-create-event'
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group as={Row} className="mb-2" controlId="eventDescription">
              <Form.Label column sm={2}>Description</Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  name="eventDescription"
                  placeholder="Enter your event event description here"
                  autoComplete="off"
                  value={event.eventDescription}
                  onChange={handleChange}
                  rows={3}
                  className='form-control-create-event'
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="eventAddress">
              <Form.Label column sm={2}>Address</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="eventAddress"
                  placeholder="Enter your event address here"
                  autoComplete="off"
                  value={event.eventAddress}
                  onChange={handleChange}
                  className='form-control-create-event'
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2" controlId="eventTnc">
              <Form.Label column sm={2}>Terms and Condition</Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  name="eventTnc"
                  placeholder="Enter your terms and condition here"
                  autoComplete="off"
                  value={event.eventTnc}
                  onChange={handleChange}
                  rows={3}
                  className='form-control-create-event'
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="eventCategory">
              <Form.Label column sm={2}>Category</Form.Label>
              <Col sm={10}>
                <Form.Select className="form-select-style" name="eventCategory" value={event.eventCategory} onChange={handleChange}>
                  <option >Enter your event category here</option>
                  {eventCategories.map(eventCategory => {
                    return <option value={eventCategory}>{eventCategory}</option>
                  })}
                </Form.Select>
              </Col>
            </Form.Group>
            <div className="d-flex flex-row-reverse">
              <Button variant="primary" type="submit" className='mt-2 px-4 create-event-button' onClick={submitButton}>
                Next
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default CreateEventComp