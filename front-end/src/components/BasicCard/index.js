import React from "react";
import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/esm/Col";
import EventImg from '../../assets/carousel/tibloc_logo.png'
import './BasicCard.css'

const BasicCard = (props) => {
  return (
    <a href="/faq" className="col-3 mb-3 text-decoration-none text-white">
      <Col >
        <Card className="faq-card shadow">
          {/* <Card.Img variant="top" src={props.img} alt={props.alt} /> */}
          <Card.Img variant="top" src={EventImg} alt={props.alt} />
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text className="small">
              {props.date}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>

    </a>

  );
}

export default BasicCard;