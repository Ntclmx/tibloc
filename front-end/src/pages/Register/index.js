import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './register.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import {Facebook, Google} from 'react-bootstrap-icons';

const Register = () => {
  return (
    <Container fluid>

    <Row className='d-flex justify-content-center align-items-center h-100'>
      <Col col='12'>

        <Card className='bg-white my-5 mx-auto shadow register-card'>
          <Card.Body className='p-5 w-100 d-flex flex-column'>

            <h2 className="fw-bold mb-2 text-center">Create Account</h2>
            
            <Form className='text-center mt-3'>
              <Form.Group className="mb-1 register-form" controlId="email">
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
              <Form.Group className="mb-1 register-form" controlId="mobile-number">
                <Form.Control type="text" placeholder="Mobile Number" />
              </Form.Group>
              <Form.Group className="mb-3 register-form" controlId="password">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary register-button" type="submit">
                Create Account
              </Button>
            </Form>
            <div className='text-center mt-4 justify-content-left'>
              <p className='register-other-create'>or create with</p>
              <Row>
                <Col col='6'>
                  <Button className="mb-2 w-100 register-other-create-button text-dark" >
                    <Google color='#0c0c14' className="mx-2 mb-1"/>
                    Google
                  </Button>
                  </Col>
                <Col col='6'>
                  <Button className="mb-2 w-100 register-other-create-button text-dark" >
                    <Facebook className="mx-2 mb-1 register-icon"/>
                    Facebook
                  </Button>
                </Col>
              </Row>

              <p className='register-terms mt-2 text-secondary'>By creating and account you have agreed to tibloc.com's Terms & Condition and Privacy Policy.</p>
              <p className=' mt-2 register-already'>Already Have an Account? <Link to="/book">Click Here</Link></p>
            </div>

          </Card.Body>
        </Card>

      </Col>
    </Row>

    </Container>
  )
}

export default Register