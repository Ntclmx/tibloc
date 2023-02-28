import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './header.css'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { CalendarWeek, BookmarkFill } from 'react-bootstrap-icons'
const Header = () => {
  return (
    <Navbar expand="lg" className='header-top'>
      <Container fluid className='my-2 justify-content-start'>
        <Navbar.Brand href="#" className="navbar-brand text-light fw-bold text-uppercase px-2 header-logo">TIBLOC.</Navbar.Brand>
        <Form className='text-center header-search'>
            <Form.Group controlId="search">
              <Form.Control type="text"/>
            </Form.Group>
        </Form>
        <CalendarWeek size={20} color='white' className='ms-auto me-4 header-icon'></CalendarWeek>
        <BookmarkFill color='white' size={20}></BookmarkFill>
      </Container>
    </Navbar>
  )
}

export default Header