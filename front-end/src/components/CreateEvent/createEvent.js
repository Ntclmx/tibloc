import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import './createEvent.css';
import { Image } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';

const CreateEventComp = (props) => {

  const history = useHistory();
  const [ event, setEvent ] = useState({
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

  const [ imagePreview, setImagePreview ] = useState(null); 

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
    resetButton();
    history.push('/create-event/tickets');
  };

  const resetButton = () => {
    setEvent({
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
  }

  const eventOrganizers = ['Org1','Org2','Org3'];
  const eventCategories = ['Cat1','Cat2','Cat3'];

  return (
    <div className='mb-5'>
      <div className='justify-content-center align-items-center text-center'>
        <h1 className='pt-2 pb-4'>Create Event</h1>
      </div>
      <Card>
        <Card.Body>
          <Form className="input-form px-3 pt-4 pb-3">
              <Form.Group as={Row} className="mb-3" controlId="eventOrganizer">
                <Form.Label column sm={2}>Organizer</Form.Label>
                <Col sm={4}>
                  <Form.Select className="form-control" name="eventOrganizer" value={event.eventOrganizer} onChange={handleChange}>
                    <option >Enter your event event organizer here</option>
                    {eventOrganizers.map(eventOrganizer => {
                        return <option value={eventOrganizer}>{eventOrganizer}</option>
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
                    />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="form-group files color pb-3 " controlId='eventLogo'>
                <Form.Label column sm={2}>Logo</Form.Label>
                <Col sm={10}>
                  <Card className='justify-content-center align-items-center'>
                    <Form.Control 
                      type="file" 
                      className="form-control create-event-upload-image" 
                      name="eventLogo"
                      onChange={imageChange}
                      
                    />
                  
                    {imagePreview ? (
                      <img src={imagePreview} className="create-event-image p-2" alt='event_logo'></img>
                      ) : (
                        <div>
                        <Image  color='grey' className='position-absolute top-50 start-50 translate-middle header-icon'></Image>
                      </div>
                    ) }  
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
                    />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="eventCategory">
                <Form.Label column sm={2}>Category</Form.Label>
                <Col sm={10}>
                  <Form.Select className="form-control" name="eventCategory" value={event.eventCategory} onChange={handleChange}>
                    <option >Enter your event category here</option>
                    {eventCategories.map(eventCategory => {
                        return <option value={eventCategory}>{eventCategory}</option>
                    })}
                  </Form.Select>
                </Col>
              </Form.Group>
              <div className="d-flex flex-row-reverse">
                <Button variant="primary" type="submit" className='mt-2 px-4 create-event-button text-dark' onClick={submitButton}>
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