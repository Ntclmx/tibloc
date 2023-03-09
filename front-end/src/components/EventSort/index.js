import React from 'react';
import './eventSort.css';
import Form from 'react-bootstrap/Form';
const EventSort = () => {
  return (
    <div className='event-sort-container py-2'>
        <div className='d-flex'>
            <h5 className='filter-card-font-bold '>Sort</h5>
            <a className='ms-auto link-sort' href='/index'><h5 className='sort-font-thin'>Reset</h5></a>
            <a className='ms-2 link-sort' href='/a'><h5 className='sort-font-thin ms-3'>Apply</h5></a>
        </div>
        <div className='d-flex'>
            <Form>
                <Form.Group className="me-4" controlId="sortDate">
                    <Form.Control type="text" className='filter-card-font-small' placeholder="Date" />
                </Form.Group>
            </Form>
            <Form>
                <Form.Group className="mb-2" controlId="sortPrice">
                    <Form.Control type="text" className='filter-card-font-small' placeholder="Price" />
                </Form.Group>
            </Form>
        </div>
    </div>
  )
}

export default EventSort