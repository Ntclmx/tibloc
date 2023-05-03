import React, { useEffect, useState, useContext } from 'react'
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
import Download from '../../assets/events/downloadQR.png';
// import Maps from '../../assets/events/maps.png';
import BookmarksFill from '../../assets/events/bookmark-fill.png';
import Axios from 'axios';
import { UserContext } from '../../pages/MainApp/index';
import Delete from '../../assets/events/trash.png';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import FileDownload from 'js-file-download';


function DeleteModal(props) {
    const history = useHistory();
    const [isSame, setIsSame] = useState(false);

    const fillDelete = (e) => {
        // console.log(e.target.value);

        if (e.target.value === props.eventTitle) {
            setIsSame(true)
        } else {
            setIsSame(false)

        }
    }

    const submitButton = (e) => {

        Axios.delete(`${process.env.REACT_APP_API_URL}/v1/event/${props._id}`)
            .then(result => {
                console.log(result.data);
                history.push('/events');
            })
            .catch(err => {
                console.log(err);
            })
    }


    const ButtonDelete = isSame ? <Button onClick={submitButton}>Delete</Button> : <Button onClick={submitButton} disabled>Delete</Button>

    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            scrollable={false}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Event
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <small className='pb-3'>To delete the event, type the name to confirm.</small>
                <Form.Group className="my-3" controlId="deleteName" onChange={(e) => fillDelete(e)}>
                    <Form.Control
                        type="text"
                        placeholder="Enter Event Name"
                        autoFocus
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                {ButtonDelete}
            </Modal.Footer>
        </Modal>
    );
}

const DetailEventCalendar = (props) => {
    const [value] = useState(new Date(props.eventDate));
    const [bookmark, setBookmark] = useState(false);
    const [wishlistId, setWishlistId] = useState('');
    const { web3User } = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        const id = props._id
        const userId = web3User

        Axios.get(`${process.env.REACT_APP_API_URL}/v1/wishlists/event/${id}/user/${userId}`)
            .then(result => {
                console.log(result.data.wishlists);
                setWishlistId(result.data.wishlists[0]._id);
                setBookmark(true);
            })
            .catch(err => {
                console.log('B');
            })

        Axios.get(`${process.env.REACT_APP_API_URL}/v1/admin/address/${userId}`)
            .then(result => {

                if (result.status === 200) {
                    setIsAdmin(true);
                }


            })
            .catch(err => {
                console.log(err);
            })
    }, [props, web3User])

    const disableDates = new Date('February 23, 2023');

    const wishlistFunc = () => {
        if (bookmark === false) {
            const wishlist = {
                eventId: props._id,
                userId: web3User,
            };

            Axios.post(`${process.env.REACT_APP_API_URL}/v1/wishlist`, wishlist)
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
            Axios.delete(`${process.env.REACT_APP_API_URL}/v1/wishlist/${wishlistId}`)
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

    const downloadQRFunc = () => {


        Axios.get(`${process.env.REACT_APP_API_URL}/v1/event/${props._id}/categories`)
            .then(result => {
                const categories = result.data.categories;

                for (const category of categories) {
                    console.log(category, props.eventTitle);

                    Axios.get(`${process.env.REACT_APP_API_URL}/v1/category/${category._id}/qr`, {
                        responseType: 'blob'
                    })
                        .then(result => {
                            console.log(result);

                            FileDownload(result.data, `${props.eventTitle}-${category.categoryName}.png`)
                        })
                        .catch(err => {
                            console.log(err);
                        })

                }

            })
            .catch(err => {
                console.log('B');
            })

    }

    const Component = bookmark ? <Image src={BookmarksFill} onClick={wishlistFunc} className='iconDetailEvent'></Image> : <Image src={Bookmark} onClick={wishlistFunc} className='iconDetailEvent'></Image>;

    const editButton = isAdmin ? <><a href={`/edit-event/events/${props._id}`} className='ms-auto'><Image src={Edit} className='iconDetailEvent ' ></Image></a><Image src={Delete} className='iconDetailEvent ms-auto' onClick={() => setModalShow(true)}></Image>
    <Image src={Download} className='iconDetailEvent ms-auto' onClick={downloadQRFunc}></Image></> : <></>
    return (
        <div className='ps-5'>
            <DeleteModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                eventTitle={props.eventTitle}
                _id={props._id}
            />
            <div className='d-flex'>
                {Component}
                {editButton}
                
            </div>
            <Card className='mt-3 card-properties border-gradient-purple'>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                            <Col className='col-12 d-flex align-items-center '>
                                <Card.Text style={{ color: "gray" }}>
                                    {props.eventAddress}
                                </Card.Text>
                            </Col>
                            {/* <Col className='col-3 d-flex align-items-center justify-content-center'>
                                <Image src={Maps} className='iconDetailEvent ' ></Image>
                            </Col> */}
                        </Row>

                    </ListGroup.Item>
                </ListGroup>
                <Calendar
                    className='my-1 px-2 pt-2 pb-3'
                    value={value}
                    defaultActiveStartDate={value}
                    activeStartDate={value}
                    defaultValue={value}
                    maxDate={value}
                    minDate={value}


                    tileDisabled={({ date }) => {
                        if (date === disableDates) {
                            return true;
                        }
                        else {
                            return false
                        }
                    }}
                />
                <Button variant="secondary" size="lg" className='mx-2 px-2 mb-3' href={`/event/${props._id}/categories`}>
                    Choose Ticket
                </Button>
            </Card>
        </div>
    )
}

export default DetailEventCalendar