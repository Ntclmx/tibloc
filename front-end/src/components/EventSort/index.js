import React, { useState } from 'react'
import './eventSort.css';
import Form from 'react-bootstrap/Form';

const EventSort = (props) => {
    const [sort, setSort] = useState('');
    const handleChange = (e) => {

        setSort(e.target.value)
        
        props.sortFunc(e.target.value);

        
    }

    const sortAll = [
        {
            name: 'Event (A - Z)',
            value: 'asc'
        }, {
            name: 'Event (Z - A)',
            value: 'desc'
        }];
    return (
        <div className='event-sort-container py-2'>
            <div className='d-flex'>
                <h5 className='filter-card-font-bold pt-1'>Sort</h5>
                <Form.Group className="mb-3 ms-3" controlId="eventOrganizer">

                    <Form.Select className="form-control" name="eventOrganizer" value={sort}  size="sm" onChange={handleChange}>
                        <option >Sort By</option>
                        {sortAll.map(sortA => {
                            return <option value={sortA.value}>{sortA.name}</option>
                        })}
                    </Form.Select>

                </Form.Group>
            </div>

        </div>
    )
}

export default EventSort