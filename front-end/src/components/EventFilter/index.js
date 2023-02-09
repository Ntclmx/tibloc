import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './filterCard.css'

const EventFilter = () => {

   const locations = ['Jabodetabek','Jakarta','Bogor','Depok','Tangerang'];
   const categories = ['Comedy','Music','Sport','Fun&Games'];
  return (
    <Card className='filter-card me-3'>
      <Card.Body>
        <Card.Title className='filter-card-font-bold'>Filter</Card.Title>
        <Card.Title className='mt-4 filter-card-font-bold'>Location</Card.Title>
        <Form>
        <Form.Group className="mb-2" controlId="filterLocation">
            <Form.Control type="text" className='filter-card-font-small' placeholder="Search" />
        </Form.Group>
        {locations.map((loc) => (
            <div key={`filter-loc-${loc}`} className="mb-1">
                <Form.Check 
                    type = 'checkbox'
                    id={`filter-loc-${loc}`}
                    label={loc}
                    className='filter-card-font-small'
                />
            </div>
        ))}

        </Form>
        <Card.Title className='mt-4 filter-card-font-bold'>Category</Card.Title>
        <Form>
        <Form.Group className="mb-2" controlId="filterCategory">
            <Form.Control type="text" className='filter-card-font-small' placeholder="Search" />
        </Form.Group>
        {categories.map((cat) => (
            <div key={`filter-cat-${cat}`} className="mb-1">
                <Form.Check 
                    type = 'checkbox'
                    id={`filter-cat-${cat}`}
                    label={cat}
                    className='filter-card-font-small'
                />
            </div>
        ))}
        
        </Form>
      </Card.Body>
    </Card>
  )
}

export default EventFilter