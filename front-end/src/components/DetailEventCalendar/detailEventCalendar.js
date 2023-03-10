import React, { useEffect, useState } from 'react'
// import { Bookmark, PencilSquare, MapFill } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Calendar from 'react-calendar';
import './calendar.css';
import Bookmark from '../../assets/header/bookmark.png';
import Edit from '../../assets/events/edit.png';
import Maps from '../../assets/events/maps.png';
import BookmarksFill from '../../assets/events/bookmark-fill.png';
import Axios from 'axios';

const DetailEventCalendar = (props) => {
    const [value, onChange] = useState(new Date());
    const [bookmark, setBookmark] = useState(false);
    const [wishlistId, setWishlistId] = useState('');

    useEffect(() => {
        const id = props._id

        Axios.get(`http://127.0.0.1:4000/v1/wishlists/event/${id}/user/123`)
            .then(result => {
                console.log(result.data.wishlists);
                setWishlistId(result.data.wishlists[0]._id);
                setBookmark(true);
            })
            .catch(err => {
                console.log('B');
            })
    }, [props])

    const disableDates = new Date('February 23, 2023');

    const bookmarkFunc = () => {
        if (bookmark === false) {
            const wishlist = {
                eventId: props._id,
                userId: '123'
            };

            Axios.post(`http://127.0.0.1:4000/v1/wishlist`, wishlist)
                .then(result => {
                    console.log(result.data.wishlist);
                    setBookmark(true)
                    setWishlistId(result.data.wishlist._id);
                })
                .catch(err => {
                    console.log(err);
                })

        } else {
            console.log(wishlistId);
            Axios.delete(`http://127.0.0.1:4000/v1/wishlist/${wishlistId}`)
                .then(result => {
                    console.log(result);
                    setBookmark(false)
                    setWishlistId('');
                })
                .catch(err => {
                    console.log(err);
                })
        }
    };

    const Component = bookmark ? <Image src={BookmarksFill} onClick={bookmarkFunc} className='iconDetailEvent'></Image> : <Image src={Bookmark} onClick={bookmarkFunc} className='iconDetailEvent'></Image>;

    return (
        <div className='ps-5'>
            <div className='d-flex'>
                {Component}
                <Image src={Edit} onClick={bookmarkFunc} className='iconDetailEvent ms-auto' ></Image>
            </div>
            <Card className='mt-3'>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                            <Col className='col-9 d-flex align-items-center '>
                                <Card.Text style={{ color: "gray" }}>
                                    {props.eventAddress}
                                </Card.Text>
                            </Col>
                            <Col className='col-3 d-flex align-items-center justify-content-center'>
                                <Image src={Maps} className='iconDetailEvent ' ></Image>
                            </Col>
                        </Row>

                    </ListGroup.Item>
                </ListGroup>
                <Calendar
                    className='my-1 px-2 pt-2 pb-3'
                    onChange={onChange}
                    value={value}
                    // defaultActiveStartDate={new Date(2017, 0, 1)}
                    tileDisabled={({ date }) => {
                        if (date === disableDates) {
                            return true;
                        }
                        else {
                            return false
                        }
                    }}
                />
                <Button variant="primary" size="lg" className='mx-2 px-2 mb-3' href={`/event/${props._id}/categories`}>
                    Choose Ticket
                </Button>
            </Card>
        </div>
    )
}

export default DetailEventCalendar