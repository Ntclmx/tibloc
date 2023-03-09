import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import './footer.css'
import { Facebook, Instagram, Github, Linkedin } from 'react-bootstrap-icons';
import Nav from 'react-bootstrap/Nav';

const Footer = () => {
  return (
    <Navbar variant="dark" sticky='buttom' className='footer pt-3 pb-2'>
      <Container className=''>
        <Row className='footerRow '>
          <Col className='col-12 mb-3'>
            <Nav className="me-auto">
              <Nav.Link className='me-5 footerNavLink' href="/home">About Us</Nav.Link>
              <Nav.Link className='mx-5 footerNavLink' href="/features">Help Center</Nav.Link>
              <Nav.Link className='mx-5 footerNavLink' href="/pricing">Privacy Policy</Nav.Link>
              <Nav.Link className='ms-5 footerNavLink' href="/pricing">Terms & Conditions</Nav.Link>
            </Nav>
          </Col>
          <Col className='col-12 mb-2'>
            <Nav className="justify-content-center" activeKey="/home">
              <Nav.Item>
                <Nav.Link href="https://id-id.facebook.com/" target="_blank"><Facebook/></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="https://www.instagram.com/" target="_blank"><Instagram/></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="https://www.linkedin.com/" target="_blank"><Linkedin/></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="https://github.com/Ntclmx/tibloc" target="_blank" ><Github/></Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col className='col-12 justify-content-center text-center text-white footerTextButtom'>
            Copyright © 2023 PT. Tiket Jaya Indonesia
          </Col>
        </Row>
      </Container>
    </Navbar>

  )
}

export default Footer