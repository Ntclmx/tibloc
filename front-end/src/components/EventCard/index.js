import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import './eventCard.css';
import Circle from '../../assets/events/circle.png';
import Image from 'react-bootstrap/Image';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

const EventCard = (props) => {
  const [price, setPrice] = useState(0);
  const [show, setShow] = useState(false);
  const [allFalse, setAllFalse] = useState(true);
  const [showCat, setShowCat] = useState(false);
  const [allFalseCat, setAllFalseCat] = useState(true);
  const [org, setOrg] = useState('');
  const history = useHistory();
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/v1/event/${props._id}/categories`)
      .then(result => {
        const categories = result.data.categories;

        // console.log('test',categories);
        let finalPrice = 1000000000000;
        for (let category of categories) {
          if (category.categoryPrice < finalPrice) {
            finalPrice = category.categoryPrice;
          }

          setPrice(finalPrice);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }, [props]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/v1/organizer/${props.eventOrganizer}`)
      .then(result => {
        
        setOrg(result.data.organizer)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    if (props.dashboard === false) {
      if (props.filter === 'location') {
        let locationsQuery = props.locs;
        setAllFalseCat(false);
        setShowCat(false);
        if (props.locsQuery === '') {
          setAllFalse(true);
        }
        else {

          setAllFalse(false);
        }


        for (const loc of locationsQuery) {

          setShow(false);
          if (loc.checked) {

            setAllFalse(false);

            if (props.eventAddress.toLowerCase().includes(loc.name.toLowerCase())) {

              setShow(true);
              break;
            }

          }

        }
      } else {

        let categoriesQuery = props.cats;
        setAllFalse(false);
        setShow(false);
        if (props.catsQuery === '') {
          setAllFalseCat(true);
        }
        else {

          setAllFalseCat(false);
        }

        for (const cat of categoriesQuery) {

          setShowCat(false);
          if (cat.checked) {

            console.log('aa', typeof (cat.name?.toLowerCase()), typeof (props.eventCategory?.toLowerCase()))

            setAllFalseCat(false);

            if (props.eventCategory?.toLowerCase().includes(cat.name?.toLowerCase())) {
              setShowCat(true);
              break;
            }

          }

        }
      }
    }


  }, [props.locs, props.cats, props.eventCategory, props.eventAddress, props.locsQuery, props.catsQuery, props.filter, props.dashboard])

  // const formatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'IDR',
  // });


  // const totalPrice = formatter.format(price);
  if (props.dashboard) {
    return (
      <Col className='col-3 pb-3 d-flex justify-content-center align-items-start'>
        <Card className='event-card text-start shadow' onClick={() => history.push(`/event/${props._id}`)}>
          <Card.Header className='event-card-header d-flex'>
            <Image src={`${process.env.REACT_APP_API_URL}/${org.organizerLogo}`} className='event-card-promotor-image me-3'></Image>
            <div className='event-card-promotor-text'>
              {org.organizerName}
            </div>
          </Card.Header>
          <Card.Img className='event-card-image' variant="top" src={props.eventLogo} alt='event' />
          <Card.Text className='position-absolute event-card-date text-white py-1'>{props.eventDate}</Card.Text>
          <Card.Body className='event-card-body'>
            <Card.Title className='event-card-title pb-0 mb-0'>{props.eventTitle}</Card.Title>
            <Card.Text className='event-card-price pt-0'>
              MATIC {price}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    )
  }
  if (props.filter === 'location') {
    if (props.locsQuery !== '') {
      if (show || allFalse || props.eventAddress.toLowerCase().includes(props.locsQuery.toLowerCase())) {
        return (
          <Col className='col-3 pb-3 d-flex justify-content-start align-items-start'>
            <Card className='event-card text-start shadow' onClick={() => history.push(`/event/${props._id}`)}>
              <Card.Header className='event-card-header d-flex'>
                <Image src={`${process.env.REACT_APP_API_URL}/${org.organizerLogo}`} className='event-card-promotor-image me-3'></Image>
                <div className='event-card-promotor-text'>
                  {org.organizerName}
                </div>
              </Card.Header>
              <Card.Img className='event-card-image' variant="top" src={props.eventLogo} alt='event' />
              <Card.Text className='position-absolute event-card-date text-white py-1'>{props.eventDate}</Card.Text>
              <Card.Body className='event-card-body'>
                <Card.Title className='event-card-title pb-0 mb-0'>{props.eventTitle}</Card.Title>
                <Card.Text className='event-card-price pt-0'>
                  MATIC {price}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )

      }
    }
    else {
      if (show || allFalse) {
        return (
          <Col className='col-3 pb-3 d-flex justify-content-start align-items-start'>
            <Card className='event-card text-start shadow' onClick={() => history.push(`/event/${props._id}`)}>
              <Card.Header className='event-card-header d-flex'>
                <Image src={`${process.env.REACT_APP_API_URL}/${org.organizerLogo}`} className='event-card-promotor-image me-3'></Image>
                <div className='event-card-promotor-text'>
                  {org.organizerName}
                </div>
              </Card.Header>
              <Card.Img className='event-card-image' variant="top" src={props.eventLogo} alt='event' />
              <Card.Text className='position-absolute event-card-date text-white py-1'>{props.eventDate}</Card.Text>
              <Card.Body className='event-card-body'>
                <Card.Title className='event-card-title pb-0 mb-0'>{props.eventTitle}</Card.Title>
                <Card.Text className='event-card-price pt-0'>
                  MATIC {price}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )

      }
    }

  } else {
    if (props.catsQuery !== '') {
      if (showCat || allFalseCat || props.eventCategory.toLowerCase().includes(props.catsQuery.toLowerCase())) {
        return (
          <Col className='col-3  pb-3 d-flex justify-content-start align-items-start'>
            <Card className='event-card text-start shadow' onClick={() => history.push(`/event/${props._id}`)}>
              <Card.Header className='event-card-header d-flex'>
                <Image src={`${process.env.REACT_APP_API_URL}/${org.organizerLogo}`} className='event-card-promotor-image me-3'></Image>
                <div className='event-card-promotor-text'>
                  {org.organizerName}
                </div>
              </Card.Header>
              <Card.Img className='event-card-image' variant="top" src={props.eventLogo} alt='event' />
              <Card.Text className='position-absolute event-card-date text-white py-1'>{props.eventDate}</Card.Text>
              <Card.Body className='event-card-body'>
                <Card.Title className='event-card-title pb-0 mb-0'>{props.eventTitle}</Card.Title>
                <Card.Text className='event-card-price pt-0'>
                MATIC {price}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )

      }
    }
    else {
      if (showCat || allFalseCat) {
        return (
          <Col className='col-3  pb-3 d-flex justify-content-start align-items-start'>
            <Card className='event-card text-start shadow' onClick={() => history.push(`/event/${props._id}`)}>
              <Card.Header className='event-card-header d-flex'>
                <Image src={`${process.env.REACT_APP_API_URL}/${org.organizerLogo}`} className='event-card-promotor-image me-3'></Image>
                <div className='event-card-promotor-text'>
                  {org.organizerName}
                </div>
              </Card.Header>
              <Card.Img className='event-card-image' variant="top" src={props.eventLogo} alt='event' />
              <Card.Text className='position-absolute event-card-date text-white py-1'>{props.eventDate}</Card.Text>
              <Card.Body className='event-card-body'>
                <Card.Title className='event-card-title pb-0 mb-0'>{props.eventTitle}</Card.Title>
                <Card.Text className='event-card-price pt-0'>
                MATIC {price}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )

      }
    }
  }
}

export default EventCard