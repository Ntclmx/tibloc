import React from 'react'
import { EventCard } from '../../components'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ListEvents = () => {
  return (
    <Row>
        <Col col='4'>
            <EventCard></EventCard>
        </Col>
        <Col col='4'>
            <EventCard></EventCard>
        </Col>
        <Col col='4'>
            <EventCard></EventCard>
        </Col>
        <div>Pagination</div>
    </Row>
  )
}

export default ListEvents