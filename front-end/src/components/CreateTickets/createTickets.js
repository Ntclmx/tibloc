import Axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { DashLg, PlusLg } from 'react-bootstrap-icons';
import './createTicket.css';
import { useHistory } from 'react-router-dom';

const CreateTickets = (props) => {  

    const history = useHistory();
    const [tickets, setTicket] = useState([
        {
            name : '',
            price : '',
            description : '',
            stock : '',
        }
    ]);
    
    
    const handleChange = (index, e) => {
        const values = [...tickets];
        values[index][e.target.name] = e.target.value;
        setTicket(values);
    }
    
    const submitButton = (e) => {
        e.preventDefault();
        const allTickets = {
            tickets : tickets
        }
        const {event} = props;
        const allData = {...event,...allTickets};


        Axios.post('http://127.0.0.1:4000/v1/event', allData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(res => {
            console.log(res);
            history.push('/events');
        })
        .catch(err => {
            console.log(err.response.data);
        })
    };

    const addCategory = () => {
        setTicket([...tickets, {
            name : '',
            price : '',
            description : '',
            stock : '',
        }]);
    }

    const removeCategory = (index) => {
        const values = [...tickets];
        values.splice(index, 1);
        setTicket(values);
    };

    // const [totalCategories , setTotalCategories] = useState('');

    // const handleTotalNum = (e) => {
    //     console.log(e.target.value);
    //     setTotalCategories(e.target.value);
    // }

    // const totalNum = [];

    // for (let i=1; i<=5; i++) {
    //     totalNum.push(<option key={i} value={i}>{i}</option>)
    // }

    return (
      <div className='mb-5'>
        <div className='justify-content-center align-items-center text-center'>
          <h1 className='pt-2 pb-4'>Create Tickets</h1>
        </div>
        {/* <Form.Group as={Row} className="mb-3" controlId="organizer">
        <Form.Label column sm={2}>Organizer</Form.Label>
            <Col sm={4}>
                <Form.Select className="form-control" name="organizer" onChange={handleTotalNum}>
                <option >Enter your event organizer here</option>
                {totalNum}
                </Form.Select>
            </Col>
        </Form.Group> */}
        { tickets.map((ticket, index) => (
            <Card key={index} className='mb-4'>
            <Card.Body>
                <Form className="input-form px-3 pt-4 pb-3">
                    <h4 className="mb-3">Category {index+1}</h4>
                    <Form.Group as={Row} className="mb-3" controlId="name">
                        <Form.Label column sm={2}>Name</Form.Label>
                        <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter your ticket name here"
                            autoComplete="off"
                            value={ticket.name}
                            onChange={e => handleChange(index,e)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="price">
                        <Form.Label column sm={2}>Price</Form.Label>
                        <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="price"
                            placeholder="Enter your ticket price here"
                            autoComplete="off"
                            value={ticket.price}
                            onChange={e => handleChange(index,e)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="description">
                        <Form.Label column sm={2}>Description</Form.Label>
                        <Col sm={10}>
                        <Form.Control
                            as="textarea"
                            name="description"
                            placeholder="Enter your ticket description here"
                            autoComplete="off"
                            value={ticket.description}
                            onChange={e => handleChange(index,e)}
                            rows={3}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="stock">
                        <Form.Label column sm={2}>Stock</Form.Label>
                        <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="stock"
                            placeholder="Enter your ticket stock here"
                            autoComplete="off"
                            value={ticket.stock}
                            onChange={e => handleChange(index,e)}
                            />
                        </Col>
                    </Form.Group>
                    <div className="d-flex flex-row-reverse mt-3">
                        <Button className='ms-2 create-ticket-button' onClick={addCategory}><PlusLg color='secondary'></PlusLg></Button>
                        {index===1?(<Button className='me-3 create-ticket-button' onClick={() => removeCategory(index)}><DashLg color='secondary'></DashLg></Button>):<div></div>}
                        
                        
                    </div>
                </Form>
            </Card.Body>
            </Card>
        ))}
        <div className="d-flex flex-row-reverse mt-3">
        <Button variant="primary" type="submit" className='mt-2 px-4 create-event-button text-dark' onClick={submitButton}>
            Next
        </Button>
        </div>
      </div>
    )
  }

export default CreateTickets