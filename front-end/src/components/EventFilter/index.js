import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './filterCard.css';


const EventFilter = (props) => {
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
    const [locs, setLoc] = useState(allLocation);
    const [cats, setCat] = useState(allCategories);
    const locations = ['Jakarta', 'Bogor', 'Depok', 'Tangerang'];
    const categories = ['Comedy', 'Music', 'Sport', 'Fun&Games'];

    const updateFunc = (index) => {
        setCat([])
        setCat(allCategories)
        const values = [...locs];
        if (values[index]['checked']) {
            values[index]['checked'] = false;
            
        } else {
            
            values[index]['checked'] = true;
        }
        setLoc(values);
        props.updateLocationCheck(index);
    };

    const updateLocationQuery = (e) => {
        props.updateLocationQuery(e.target.value);
        setCat(allCategories);
    }

    const updateCat = (index) => {
        setLoc([])
        setLoc(allLocation)

        const values = [...cats];

        if (values[index]['checked']) {
            values[index]['checked'] = false;

        } else {

            values[index]['checked'] = true;
        }
        setCat(values);
        props.updateCategoryCheck(index);
    };

    const updateCategoryQuery = (e) => {
        props.updateCategoryQuery(e.target.value)
        setLoc(allLocation);
    }

    // console.log(locs, cats)

    return (
        <Card className='filter-card me-3 mb-2 pb-1'>
            <Card.Body>
                <Card.Title className='filter-card-font-bold'>Filter</Card.Title>
                <Card.Title className='mt-4 filter-card-font-bold'>Location</Card.Title>
                <Form>
                    <Form.Group className="mb-2" controlId="filterLocation">
                        <Form.Control type="text" className='filter-card-font-small' placeholder="Search" onChange={updateLocationQuery} />
                    </Form.Group>
                    {locations.map((loc, index) => (
                        <div key={`filter-loc-${loc}`} className="mb-1">
                            <Form.Check
                                type='checkbox'
                                checked={locs[index]['checked']}
                                // aa={console.log(index, 'locs', locs[index]['checked'])}
                                id={`filter-loc`}
                                label={loc}
                                className='filter-card-font-small'
                                value={loc}
                                onClick={() => updateFunc(index)}
                            />
                        </div>
                    ))}

                </Form>
                <Card.Title className='mt-4 filter-card-font-bold'>Category</Card.Title>
                <Form>
                    <Form.Group className="mb-2" controlId="filterCategory">
                        <Form.Control type="text" className='filter-card-font-small' placeholder="Search" onChange={updateCategoryQuery} />
                    </Form.Group>
                    {categories.map((cat, index) => (
                        <div key={`filter-cat-${cat}`} className="mb-1">
                            <Form.Check
                                type='checkbox'
                                checked={cats[index]['checked']}
                                id={`filter-cat`}
                                label={cat}
                                className='filter-card-font-small'
                                onClick={() => updateCat(index)}
                            />
                        </div>
                    ))}

                </Form>
            </Card.Body>
        </Card>
    )
}

export default EventFilter