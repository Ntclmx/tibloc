import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './categoryCard.css';

const CategoryCard = (props) => {
    let [num, setNum] = useState(0);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
    });

    const catPrice = formatter.format(props.categoryPrice);
    return (
        <Card className='catCard text-start mb-3'>
            <Card.Header className='catCardHeader d-flex'>
                <Card.Title className=' pb-0 mb-0'>{props.categoryName}</Card.Title>
                <Card.Title className='ms-auto'>{catPrice}</Card.Title>
            </Card.Header>
            <Card.Body className='d-flex p-0'>
                <Card.Text className='muted catCardBodyText pt-2 mt-1 ms-3'>
                    Tickets Left - {props.categoryStock}
                </Card.Text>
                <div className='d-flex ms-auto '>
                    <Form.Group className="mb-3" controlId={`${props._id}`}>
                        <Form.Control
                            type="number"
                            min={0}
                            max={props.categoryStock}
                            defaultValue={num}
                            size="sm"
                            className='catCardNum mt-2 pt-1 me-2 text-center'
                            onChange={e => { 
                                
                                const nowChangeValue = parseInt(e.target.value)
                                let totalTicket = 1;

                                if(num > nowChangeValue)
                                {
                                    totalTicket = -1;
                                }
                                setNum(nowChangeValue);
                                props.showNum(totalTicket, props.categoryPrice) 
                            }}
                        />
                    </Form.Group>

                </div>
            </Card.Body>
        </Card>
    )
}

export default CategoryCard