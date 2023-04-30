import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Card, Image, Row } from 'react-bootstrap';
import './trxCard.css';
import { useHistory } from 'react-router-dom';

const TransactionCard = (props) => {
  console.log(props)
  const history = useHistory();

  const [cat, setCat] = useState({});
  const [event, setEvent] = useState({});

  const [dataNFT, setDataNFT] = useState({});

  useEffect(() => {

    console.log("test0")
    Axios.get(`${process.env.REACT_APP_API_URL}/v1/category/${props.eventCategoryId}`)
      .then(result => {
        setCat(result.data.category);
        console.log("test1")
        Axios.get(`${process.env.REACT_APP_API_URL}/v1/event/${props.eventId}`)
          .then(result => {
            setEvent(result.data.event);
            console.log("test2")

            
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
      console.log("test4")
  }, [props]);

  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let newFormatDate = new Date(event.eventDate);
  newFormatDate = newFormatDate.toLocaleDateString("en-GB", options);

  const allData = {
    'category' : cat,
    'event' : event,
    'nft' : props
  }
  
  // const formatter = new Intl.NumberFormat('en-US', {
  //   style: 'currency',
  //   currency: 'IDR',
  // });

  // const totalPrice = formatter.format(cat.categoryPrice);



  if(props.query !== '')
  {
    if(event.eventTitle.toLowerCase().includes(props.query.toLowerCase()) || cat.categoryName.toLowerCase().includes(props.query.toLowerCase()))
    {
      if (event._id) {
        return (
          <Card className='mb-4 trxCard' onClick={() => history.push({pathname : `/transaction/${props.tokenId}`, state: allData})}>
            <Row>
              <div className='col-2 d-flex justify-content-center'>
                <Image src={`${process.env.REACT_APP_API_URL}/${event.eventLogo}`} className='trxCardImage my-2'></Image>
              </div>
              <div className='col-7 d-flex trxCardDiv1 my-2'>
                <div className='d-flex align-items-center'>
                  <div>
                    <h3 className='text-uppercase mb-0'>{event.eventTitle}</h3>
                    <p className='trxCardP'>{newFormatDate}</p>
                    <p className='trxCardP'>{cat.categoryName} | {cat.categoryPrice} ETH</p>
                  </div>
                </div>
              </div>
              <div className='col-3 d-flex justify-content-end pe-4'>
                <div className='align-items-center d-flex '>
                  <div className='trxCardGradDiv'>
                    {
                      props.isUsed ? ( <h5 className={`text-uppercase mb-0 trxCardGradText-True`}>USED</h5> ) : (<h5 className={`text-uppercase mb-0 trxCardGradText-False`}>NOT USED</h5> ) 
                    }
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
        <Card className='mb-4 trxCard' onClick={() => history.push({pathname : `/transaction/${props.tokenId}`, state: allData})}>
          <Row>
            <div className='col-2 d-flex justify-content-center'>
              <Image src={`${process.env.REACT_APP_API_URL}/${event.eventLogo}`} className='trxCardImage my-2'></Image>
            </div>
            <div className='col-7 d-flex trxCardDiv1 my-2'>
              <div className='d-flex align-items-center'>
                <div>
                  <h3 className='text-uppercase mb-0'>{event.eventTitle}</h3>
                  <p className='trxCardP'>{newFormatDate}</p>
                  <p className='trxCardP'>{cat.categoryName} | {cat.categoryPrice} ETH</p>
                </div>
              </div>
            </div>
            <div className='col-3 d-flex justify-content-end pe-4'>
              <div className='align-items-center d-flex '>
                <div className='trxCardGradDiv'>
                {
                      props.isUsed ? ( <h5 className={`text-uppercase mb-0 trxCardGradText-True`}>USED</h5> ) : (<h5 className={`text-uppercase mb-0 trxCardGradText-False`}>NOT USED</h5> ) 
                    }
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