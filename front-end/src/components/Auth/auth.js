import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";

import { Facebook, Google } from "react-bootstrap-icons";

// import * as qs from "qs";

// const CLIENT_ID =
//   "348334482720-r76gtpogm62h5tkdusv3o4fp38rq2hfp.apps.googleusercontent.com";

// const stringifiedParams = qs.stringify({
//   client_id: CLIENT_ID,
//   redirect_uri: "http://localhost:3000/home",
//   scope: [
//     "https://www.googleapis.com/auth/userinfo.email",
//     "https://www.googleapis.com/auth/userinfo.profile",
//   ].join(" "), // space seperated string
//   response_type: "code",
//   access_type: "offline",
//   prompt: "consent",
// });

// const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;


const ThirdPartyLogin = () => {
  const googleAuth = () => {
    console.log("testttt log")
    window.open(
      // `${process.env.REACT_APP_API_URL}/auth/google/callback`,"_self"
      `http://localhost:4000/auth/google/callback`,"_self"
    );
  };

  return (
    <Row>
      <Col col="6">
        {/* class="btn btn-outline-primary" role="button" data-bs-toggle="button" */}
        <button onClick={googleAuth} className="btn btn-outline-primary" role="button">
          <Google color="#0c0c14" className="mx-2 mb-1" />
          Google
        </button>
      </Col>
      <Col col="6">
        <Button className="mb-2 w-100 register-other-create-button text-dark">
          <Facebook className="mx-2 mb-1 register-icon" />
          Facebook
        </Button>
      </Col>
    </Row>
  );
};

// const urlParams = qs.parse(window.location.search);
// if (urlParams.error) {
//   console.log(`An error occurred: ${urlParams.error}`);
// } else {
//   console.log(`The code is: ${urlParams.code}`);
// }

export default ThirdPartyLogin;
