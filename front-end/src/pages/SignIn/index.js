import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ThirdPartyLogin } from "../../components";
import axios from "axios";
import {Link} from "react-router-dom";


const SignIn = () => {
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  
  async function submit(e){
    e.preventDefault();
    try {
      await axios.get("http://localhost:4000/v1/auth/sign-in",{
        email,password
      })
      .then(res => {
        if(res.data === "user-customer"){
          window.location = "http://localhost:3000/home";
        } else if (res.data === "user-admin"){
          window.location = "http://localhost:3000/home-admin";
        } else if (res.data === "user-notexists"){
          alert("User Not Exist. Please Sign Up.");
        } else if (res.data === "wrong-password"){
          alert("Wrong Password. Please Try Again");
        } else {
          alert("Failed SignIn. Please try again.");
        }
      })
      .catch(e => {
        alert("Wrong Details.");
        console.log(e);
      })
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col col="12">
          <Card className="bg-white my-5 mx-auto shadow register-card">
            <Card.Body className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">Login</h2>

              <Form className="text-center mt-3">
                <Form.Group
                  className="mb-2 register-form"
                  controlId="email"
                >
                  <Form.Control type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-2 register-form" controlId="password">
                  <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                </Form.Group>
                <Button
                  variant="primary register-button"
                  className="mt-5"
                  type="submit"
                  onClick={submit}
                >
                  Log in
                </Button>
              </Form>
              <div className="text-center mt-4 justify-content-left">
                <p className="register-other-create">or log in with</p>
                <ThirdPartyLogin/>

                <p className="register-terms mt-2 text-secondary">
                  By logging in you have agreed to tibloc.com's Terms &
                  Condition and Privacy Policy.
                </p>
                <p className=" mt-2 register-already">
                  Don't have an account? <Link to="/sign-up">Create now</Link>
                </p>
              </div>
            </Card.Body>
          </Card>

        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
