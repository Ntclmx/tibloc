import React, { useState } from 'react'
import { Bookmark, PencilSquare, MapFill } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Calendar from 'react-calendar';
import './calendar.css';

const DetailEventCalendar = (props) => {
    const [value, onChange] = useState(new Date());
    const disableDates = new Date('February 23, 2023');
    console.log(disableDates);
    return (
        <div className='ps-5'>
            <div className='d-flex'>
                <Bookmark color='black' size={30}></Bookmark>
                <PencilSquare color='black' className='ms-auto' size={30}></PencilSquare>
            </div>
            <Card className='mt-3'>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                            <Col className='col-9 d-flex align-items-center '>
                                <Card.Text style={{ color: "gray" }}>
                                    { props.eventAddress }
                                </Card.Text>
                            </Col>
                            <Col className='col-3 d-flex align-items-center justify-content-center'>
                                <MapFill color='black'  size={30}></MapFill>
                            </Col>
                        </Row>

                    </ListGroup.Item>
                </ListGroup>
                <Calendar 
                    className='my-1 px-2 pt-2 pb-3' 
                    onChange={onChange} 
                    value={value}
                    // defaultActiveStartDate={new Date(2017, 0, 1)}
                    tileDisabled={({date}) => {
                        console.log(date);
                        if(date===disableDates)
                        {
                            return true;
                        }
                        else {
                            return false
                        }
                    }}
                />
                <Button variant="primary" size="lg" className='mx-2 px-2 mb-3'>
                    Choose Ticket
                </Button>
            </Card>
        </div>
    )
}

export default DetailEventCalendar