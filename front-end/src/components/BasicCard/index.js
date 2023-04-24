import React from "react";
import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/esm/Col";
import EventImg from '../../assets/events/event1.jpg'

const BasicCard = (props) => {
  return (
    <Col className="col-3 mb-3">
      <Card>
      <Card.Img variant="top" src={EventImg} alt={props.alt} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.date}
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
    
  );
}

export default BasicCard;