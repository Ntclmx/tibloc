import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ThirdPartyLogin } from "../../components";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signIn, reset } from "../../features/authSlice";

const SignIn = () => {
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      if(user.userType === 'A'){
        history.push("/dashboard-admin");
      }else if(user.userType === 'C'){
        history.push("/dashboard");
      }
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, history]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(signIn({ email, password }));
  };

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col col="12">
          <Card className="bg-white my-5 mx-auto shadow register-card">
            <Card.Body className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">Login</h2>

              <Form className="text-center mt-3" onSubmit={Auth}>
                {isError && <p className="has-text-centered">{message}</p>}
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
                  // onClick={submit}
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
