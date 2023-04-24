import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './signup.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { ThirdPartyLogin } from '../../components';
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');
  const history = useHistory();

  async function submit(e) {
    e.preventDefault();

    const type = 'C'
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/v1/users`, {
        name, email, password, confPassword, type
      });
      history.push("/dashboard-guest");
    } catch (e) {
      if (e.response) {
        setMsg(e.response.data.msg);
      }
    }
  }

  const Component = msg !== '' ? <Alert variant="danger" dismissible onClose={() => setMsg('')}>{msg}</Alert> : <div></div>;

  return (
    <Container fluid>

      <Row className='d-flex justify-content-center align-items-center h-100'>
        <Col col='12'>
          <Card className='bg-white my-5 mx-auto shadow register-card'>
            <Card.Body className='p-5 w-100 d-flex flex-column'>
              {Component}

              <h2 className="fw-bold mb-2 text-center">Create Account</h2>

              <Form className='text-center mt-3' action='POST'>
                <Form.Group className="mb-1 register-form" controlId="name">
                  <Form.Control type="text" placeholder="Name" onChange={(e) => { setName(e.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-1 register-form" controlId="email">
                  <Form.Control type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3 register-form" controlId="password">
                  <Form.Control type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3 register-form" controlId="conf-password">
                  <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => { setConfPassword(e.target.value) }} />
                </Form.Group>
                <Button variant="primary register-button" type="submit" onClick={submit}>
                  Create Account
                </Button>
              </Form>
              <div className='text-center mt-4 justify-content-left'>
                <p className='register-other-create'>or create with</p>
                <ThirdPartyLogin />

                <p className='register-terms mt-2 text-secondary'>By creating and account you have agreed to tibloc.com's Terms & Condition and Privacy Policy.</p>
                <p className=' mt-2 register-already'>Already Have an Account? <Link to="/sign-in">Click Here</Link></p>
              </div>

            </Card.Body>
          </Card>

        </Col>
      </Row>

    </Container>
  )
}

export default SignUp
