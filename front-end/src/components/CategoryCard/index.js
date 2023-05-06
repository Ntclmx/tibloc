import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Plus from '../../assets/events/plus.png'
import Minus from '../../assets/events/minus.png'
import Image from 'react-bootstrap/Image';
import './categoryCard.css';

const CategoryCard = (props) => {
    const [choose, setChoose] = useState(false);

    if (choose === true)
    {
        if (props.chooseCategory !== props.detailCat.categoryName)
        {
            setChoose(false);
        }
         
    }

    const chooseTicketFunc = () => {
        if (choose === false) {
            
            props.showNum(props.detailCat)
            setChoose(true);
            
        } else {
            
            const tempShow = {
                categoryName : "-",
                categoryPrice : 0
            };
            props.showNum(tempShow)
            setChoose(false);
        }
    };

    const Component = choose ? <Image src={Minus} onClick={chooseTicketFunc} className='chooseTicketIcon'></Image> : <Image src={Plus} onClick={chooseTicketFunc} className='chooseTicketIcon'></Image> ;


    // const formatter = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'IDR',
    // });

    // const catPrice = formatter.format(props.categoryPrice);
    return (
        <Card className='catCard text-start mb-3'>
            <Card.Header className='catCardHeader d-flex'>
                <Card.Title className=' pb-0 mb-0'>{props.detailCat.categoryName}</Card.Title>
                <Card.Title className='ms-auto'>MATIC {props.detailCat.categoryPrice}</Card.Title>
            </Card.Header>
            <Card.Body className='d-flex p-0'>
                <Card.Text className='muted catCardBodyText pt-2 mt-1 ms-3'>
                    Tickets Left - {props.detailCat.categoryStock}
                </Card.Text>
                <div className='d-flex ms-auto'>
                    <div className='d-flex justify-content-center align-items-center me-3'>
                        {Component}
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CategoryCard