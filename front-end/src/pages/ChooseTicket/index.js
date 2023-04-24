import {
  useGlobalState,
  setGlobalState,
  setLoadingMsg,
  setAlert,
} from "../../config/Store/index";
import { mintNFT } from "../../config/Blockchain.Service";
import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Axios from "axios";
import "./chooseTicket.css";
import { GeoAltFill, Calendar2Fill, ClockFill } from "react-bootstrap-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CategoryCard } from "../../components";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ChooseTicket = (props) => {
  const [categories, setCategory] = useState({});
  const [event, setEvent] = useState({});

  const [price, setPrice] = useState(0);
  const [chooseCategory, setChooseCategory] = useState("-");
  const [selCat, setSelCat] = useState("-");
  const [idCategory, setIdCategory] = useState("");

  useEffect(() => {
    const id = props.match.params.id;

    Axios.get(`${process.env.REACT_APP_API_URL}/v1/event/${id}`)
      .then((result) => {
        console.log(result.data.event);
        setEvent(result.data.event);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props]);

  useEffect(() => {
    const id = props.match.params.id;

    Axios.get(`${process.env.REACT_APP_API_URL}/v1/event/${id}/categories`)
      .then((result) => {
        console.log(result.data.categories);
        setCategory(result.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props]);

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let newFormatDate = new Date(event.eventDate);
  newFormatDate = newFormatDate.toLocaleDateString("en-US", options);

  const showNum = (detailCat) => {
    setChooseCategory(detailCat.categoryName);
    setPrice(detailCat.categoryPrice);
    setIdCategory(detailCat._id);
    setSelCat(detailCat);
  };

  // const formatter = new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: 'IDR',
  // });

  // const totalPrice = formatter.format(price);
  const mintFunction = async (e) => {
    e.preventDefault();

    if (!idCategory) return;

    try {
      //convert date to seconds format
      const eventDate = Math.floor(
        new Date(event.eventDate).getTime()/1000
      );

      // get Randomized IPFS (NFT Object)
      let randomizedIPFS = "";
      Axios.get(
        `${process.env.REACT_APP_API_URL}/v1/category/${selCat._id}/nft`
      )
        .then((result) => {
          console.log(result.data.nft);
          randomizedIPFS = result.data.nft;
        })
        .catch((err) => {
          console.log(err);
        });

      setLoadingMsg("Initializing transaction...");
      await mintNFT(
        selCat.categoryName,
        selCat.categoryDescription,
        randomizedIPFS.nftImageURL,
        selCat.categoryPrice,
        selCat._id,
        eventDate
      );

      // update stock
      Axios.put(
        `${process.env.REACT_APP_API_URL}/v1/category/${selCat._id}/stock`
      )
        .then((result) => {
          console.log(result.data.category);
        })
        .catch((err) => {
          console.log(err);
        });

      setAlert("Minting completed...", "green");
      window.location.reload();
    } catch (error) {
      console.log("Error uploading file: ", error);
      setAlert("Minting failed...", "red");
    }
  };

  let button = "";
  if (chooseCategory === "-") {
    button = (
      <div className="mx-1 px-2 mb-3 d-grid">
        <Button variant="primary" size="lg" disabled>
          Mint
        </Button>
      </div>
    );
  } else {
    button = (
      <div className="mx-1 px-2 mb-3 d-grid">
        <Button variant="primary" size="lg" onClick={mintFunction}>
          Mint
        </Button>
      </div>
    );
  }

  if (categories[0]) {
    return (
      <div className="minDiv">
        <Row className="mb-5">
          <Col className="col-7">
            <h1>{event.eventTitle}</h1>
            <div className="chooseTicketSmallDiv mb-4">
              <Row>
                <Col className="col-1">
                  <GeoAltFill className="mb-1" />
                </Col>
                <Col className="col-11">
                  <p className="chooseTicketText">{event.eventAddress}</p>
                </Col>
                <Col className="col-1">
                  <Calendar2Fill className="mb-1 me-2" />
                </Col>
                <Col className="col-11">
                  <p className="chooseTicketText">{newFormatDate}</p>
                </Col>
                <Col className="col-1">
                  <ClockFill className="mb-1 me-2" />
                </Col>
                <Col className="col-11">
                  <p className="chooseTicketText">{event.eventTime}</p>
                </Col>
              </Row>
            </div>

            {categories.map((category) => {
              console.log(typeof category);
              return (
                <CategoryCard
                  key={category._id}
                  detailCat={category}
                  categoryName={category.categoryName}
                  categoryPrice={category.categoryPrice}
                  categoryStock={category.categoryStock}
                  categoryDescription={category.categoryDescription}
                  chooseCategory={chooseCategory}
                  _id={category._id}
                  showNum={showNum}
                />
              );
            })}
          </Col>
          <Col className="col-4 ms-5">
            <Card className="text-start mb-3">
              <Card.Header className="catCardHeader d-flex">
                <Card.Title className=" pb-0 mb-0">Detail</Card.Title>
              </Card.Header>
              <Card.Body className="p-0">
                <Card.Text className="muted pt-2 mt-1 ms-3">
                  <p className="paymentCard">Category : {chooseCategory}</p>
                  <p className="paymentCard">Total : {price}</p>
                </Card.Text>
                <div className="mx-2">{button}</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  } else <p>Loading...</p>;
};

export default withRouter(ChooseTicket);
