import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Card, Image, Row } from 'react-bootstrap';
import './trxCard.css';
import { useHistory } from 'react-router-dom';

const TransactionCard = (props) => {
  const history = useHistory();

  const [cat, setCat] = useState({});
  const [event, setEvent] = useState({});

  useEffect(() => {

    const catId = props.catId;

    Axios.get(`${process.env.REACT_APP_API_URL}/v1/category/${catId}`)
      .then(result => {
        setCat(result.data.category);

        const eventId = result.data.category.eventId;
        Axios.get(`${process.env.REACT_APP_API_URL}/v1/event/${eventId}`)
          .then(result => {
            setEvent(result.data.event);
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
  }, [props]);

  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let newFormatDate = new Date(event.eventDate);
  newFormatDate = newFormatDate.toLocaleDateString("en-US", options);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
  });

  const totalPrice = formatter.format(cat.categoryPrice);

  if(props.query !== '')
  {
    if(event.eventTitle.toLowerCase().includes(props.query.toLowerCase()) || props.paymentStatus.toLowerCase().includes(props.query.toLowerCase()) || cat.categoryName.toLowerCase().includes(props.query.toLowerCase()))
    {
      if (event._id) {
        return (
          <Card className='mb-4 trxCard' onClick={() => history.push(`/transaction/${props._id}`)}>
            <Row>
              <div className='col-2 d-flex justify-content-center'>
                <Image src={`${process.env.REACT_APP_API_URL}/${event.eventLogo}`} className='trxCardImage my-2'></Image>
              </div>
              <div className='col-7 d-flex trxCardDiv1 my-2'>
                <div className='d-flex align-items-center'>
                  <div>
                    <h3 className='text-uppercase mb-0'>{event.eventTitle}</h3>
                    <p className='trxCardP'>{newFormatDate}</p>
                    <p className='trxCardP'>{cat.categoryName} | {totalPrice}</p>
                  </div>
                </div>
              </div>
              <div className='col-3 d-flex justify-content-end pe-4'>
                <div className='align-items-center d-flex '>
                  <div className='trxCardGradDiv'>
                    <h5 className={`text-uppercase mb-0 trxCardGradText-${props.paymentStatus}`}>{props.paymentStatus}</h5>
                  </div>
                </div>
              </div>
            </Row>
          </Card>
        )
      }
      
    }

  }
  else {
    if (event._id) {
      return (
        <Card className='mb-4 trxCard' onClick={() => history.push(`/transaction/${props._id}`)}>
          <Row>
            <div className='col-2 d-flex justify-content-center'>
              <Image src={`${process.env.REACT_APP_API_URL}/${event.eventLogo}`} className='trxCardImage my-2'></Image>
            </div>
            <div className='col-7 d-flex trxCardDiv1 my-2'>
              <div className='d-flex align-items-center'>
                <div>
                  <h3 className='text-uppercase mb-0'>{event.eventTitle}</h3>
                  <p className='trxCardP'>{newFormatDate}</p>
                  <p className='trxCardP'>{cat.categoryName} | {totalPrice}</p>
                </div>
              </div>
            </div>
            <div className='col-3 d-flex justify-content-end pe-4'>
              <div className='align-items-center d-flex '>
                <div className='trxCardGradDiv'>
                  <h5 className={`text-uppercase mb-0 trxCardGradText-${props.paymentStatus}`}>{props.paymentStatus}</h5>
                </div>
              </div>
            </div>
          </Row>
        </Card>
      )
    }
  }
  
}

export default TransactionCard