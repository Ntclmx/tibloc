import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { DashLg, PlusLg, Image } from "react-bootstrap-icons";
import "./createTicket.css";
import { useHistory } from "react-router-dom";
import { setLoading, setAlert } from "../../config/Store";

const CreateTickets = (props) => {
  const history = useHistory();
  const [isUpdate, setIsUpdate] = useState(false);

  const [tickets, setTicket] = useState([
    {
      categoryName: "",
      categoryPrice: "",
      categoryDescription: "",
      categoryStock: "",
      _id: "",
    },
  ]);

  const [NFT1, setNFT1] = useState([
    {
      nftImage: "",
      nftProbability: "",
    },
  ]);
  const [NFT2, setNFT2] = useState([
    {
      nftImage: "",
      nftProbability: "",
    },
  ]);
  const [NFT3, setNFT3] = useState([
    {
      nftImage: "",
      nftProbability: "",
    },
  ]);

  const [imageNFT1, setImageNFT1] = useState([null]);
  const [imageNFT2, setImageNFT2] = useState([null]);
  const [imageNFT3, setImageNFT3] = useState([null]);
  const [getEvent, setEvent] = useState([null]);

  useEffect(() => {
    const eventId = props.match.params.id;
    // const { event } = props;
    // console.log(event);
    if (eventId) {
      setIsUpdate(true);
      Axios.get(
        `${process.env.REACT_APP_API_URL}/v1/event/${eventId}/categories`
      )
        .then((result) => {
          setTicket(result.data.categories);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // else if (Object.keys(props.event).length !== 0) {
    //   setEvent(props.event);
    //   if (props.event.eventLogo)
    //   {
    //     setImagePreview(URL.createObjectURL(props.event.eventLogo));

    //   }
    // }
  }, [props]);

  const handleChange = (index, e) => {
    const values = [...tickets];
    values[index][e.target.name] = e.target.value;
    setTicket(values);
  };

  const handleChangeNFT1 = (index, e) => {
    const values = [...NFT1];
    values[index][e.target.name] = e.target.value;
    setNFT1(values);
  };
  const handleChangeNFT2 = (index, e) => {
    const values = [...NFT2];
    values[index][e.target.name] = e.target.value;
    setNFT2(values);
  };
  const handleChangeNFT3 = (index, e) => {
    const values = [...NFT3];
    values[index][e.target.name] = e.target.value;
    setNFT3(values);
  };

  const [validated, setValidated] = useState(false);

  const submitButton = async (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      console.log('masuk')
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);

    e.preventDefault();
    setLoading(true, "Processing...")

    const { event } = props;

    const detailOrganize = await Axios.get(
      `${process.env.REACT_APP_API_URL}/v1/organizer/${event.eventOrganizer}`
    )
      .then((res) => {
        // console.log(res.data);
        return res.data.organizer;
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    if (isUpdate) {
      const eventId = props.match.params.id;
      setLoading(true, "Start Updating Event...")
      Axios.put(`${process.env.REACT_APP_API_URL}/v1/event/${eventId}`, event, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then(res => {

          const allTickets = {
            eventId: eventId,
            tickets: tickets
          }

          Axios.put(`${process.env.REACT_APP_API_URL}/v1/event/${eventId}/categories`, allTickets)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err.response.data);
            });
        })
        .catch(err => {
          console.log(err.response.data);
          setAlert("Update Event Failed...", "red");
        })

      setAlert("Update Event Succeed...", "green");
      history.push("/events");
    } else {
      setLoading(true, "Start Creating Event...")
      Axios.post(`${process.env.REACT_APP_API_URL}/v1/event`, event, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then(res => {

          const allTickets = {
            eventId: res.data.event._id,
            tickets: tickets
          }
          Axios.post(`${process.env.REACT_APP_API_URL}/v1/categories`, allTickets)
            .then(res => {
              setLoading(true, "Processing image...")
              const allNft = {
                categories: res.data.categories,
                nft1: NFT1,
                nft2: NFT2,
                nft3: NFT3,
                organizer: detailOrganize,
              }

              Axios.post(`${process.env.REACT_APP_API_URL}/v1/nfts`, allNft, {
                headers: {
                  'content-type': 'multipart/form-data'
                }
              })
                .then(res => {
                  console.log(res.data);
                  setAlert("Create Event Succeed...", "green");
                  history.push("/events");
                })
                .catch(err => {
                  console.log(err.response.data);
                });
            })
            .catch(err => {
              console.log(err.response.data);
            });
            setLoading(false, "")
        })
        .catch(err => {
          console.log(err.response.data);
          setAlert("Create Event Failed...", "red");
        })
    }
    setAlert("Create Event Succeed...", "green");
    history.push('/events');
  };

  const addCategory = () => {
    setTicket([
      ...tickets,
      {
        categoryName: "",
        categoryPrice: "",
        categoryDescription: "",
        categoryStock: "",
      },
    ]);
    setNFT1([
      ...NFT1,
      {
        nftImage: "",
        nftProbability: "",
      },
    ]);
    setNFT2([
      ...NFT2,
      {
        nftImage: "",
        nftProbability: "",
      },
    ]);
    setNFT3([
      ...NFT3,
      {
        nftImage: "",
        nftProbability: "",
      },
    ]);
    setImageNFT1([...imageNFT1, null]);
    setImageNFT2([...imageNFT2, null]);
    setImageNFT3([...imageNFT3, null]);
  };

  const imageChange1 = (index, e) => {
    // console.log(e.target.files[0], e.target.name)
    let allNFT1 = [...NFT1];
    allNFT1[index][e.target.name] = e.target.files[0];
    setNFT1(allNFT1);

    let allImageNFT1 = [...imageNFT1];
    allImageNFT1[index] = URL.createObjectURL(e.target.files[0]);
    setImageNFT1(allImageNFT1);
  };
  const imageChange2 = (index, e) => {
    let allNFT2 = [...NFT2];
    allNFT2[index][e.target.name] = e.target.files[0];
    setNFT2(allNFT2);

    let allImageNFT2 = [...imageNFT2];
    allImageNFT2[index] = URL.createObjectURL(e.target.files[0]);
    setImageNFT2(allImageNFT2);
  };
  const imageChange3 = (index, e) => {
    let allNFT3 = [...NFT3];
    allNFT3[index][e.target.name] = e.target.files[0];
    setNFT3(allNFT3);

    let allImageNFT3 = [...imageNFT3];
    allImageNFT3[index] = URL.createObjectURL(e.target.files[0]);
    setImageNFT3(allImageNFT3);
  };
  const removeCategory = (index) => {
    const values = [...tickets];
    values.splice(index, 1);
    setTicket(values);

    const valuesNFT1 = [...NFT1];
    valuesNFT1.splice(index, 1);
    setNFT1(valuesNFT1);

    const valuesNFT2 = [...NFT2];
    valuesNFT2.splice(index, 1);
    setNFT2(valuesNFT2);

    const valuesNFT3 = [...NFT3];
    valuesNFT3.splice(index, 1);
    setNFT3(valuesNFT3);

    const valuesimageNFT1 = [...imageNFT1];
    valuesimageNFT1.splice(index, 1);
    setImageNFT1(valuesimageNFT1);

    const valuesimageNFT2 = [...imageNFT2];
    valuesimageNFT2.splice(index, 1);
    setImageNFT2(valuesimageNFT2);

    const valuesimageNFT3 = [...imageNFT3];
    valuesimageNFT3.splice(index, 1);
    setImageNFT3(valuesimageNFT3);
  };

  // console.log(NFT1, imageNFT1, NFT2, imageNFT2, NFT3, imageNFT3)

  // console.log(NFT1[0].nftImage);
  return (
    <div className="mb-5">
      <div className="justify-content-center align-items-center text-center">
        <h1 className="pt-2 pb-4">
          {isUpdate ? "Update Tickets Category" : "Create Tickets Category"}
        </h1>
      </div>
      <Form noValidate validated={validated} className="input-form px-3 pt-4 pb-3" onSubmit={submitButton}>
        {tickets.map((ticket, index) => (
          <Card key={index} className="mb-4 card-create-ticket">
            <Card.Body>
              <h4 className="mb-3">Category {index + 1}</h4>
              <Form.Group as={Row} className="mb-3" controlId="categoryName">
                <Form.Label column sm={2}>
                  Name
                </Form.Label>
                <Col sm={10}>
                  {isUpdate ? (
                    <Form.Control

                      className="form-control-create-event text-dark"
                      type="text"
                      name="categoryName"
                      placeholder="Enter your ticket category name here"
                      autoComplete="off"
                      value={ticket.categoryName}
                      onChange={(e) => handleChange(index, e)}
                      disabled
                    />
                  ) : (
                    <Form.Control
                      required
                      className="form-control-create-event"
                      type="text"
                      name="categoryName"
                      placeholder="Enter your ticket category name here"
                      autoComplete="off"
                      value={ticket.categoryName}
                      onChange={(e) => handleChange(index, e)}
                    />
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="categoryPrice">
                <Form.Label column sm={2}>
                  Price
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    required
                    className="form-control-create-event"
                    type="text"
                    name="categoryPrice"
                    placeholder="Enter your ticket category price here"
                    autoComplete="off"
                    value={ticket.categoryPrice}
                    onChange={(e) => handleChange(index, e)}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="categoryDescription"
              >
                <Form.Label column sm={2}>
                  Description
                </Form.Label>
                <Col sm={10}>
                  {isUpdate ? (
                    <Form.Control
                      className="form-control-create-event text-dark"
                      as="textarea"
                      name="categoryDescription"
                      placeholder="Enter your ticket category description here"
                      autoComplete="off"
                      value={ticket.categoryDescription}
                      onChange={(e) => handleChange(index, e)}
                      rows={3}
                      disabled
                    />
                  ) : (
                    <Form.Control
                      required
                      className="form-control-create-event"
                      as="textarea"
                      name="categoryDescription"
                      placeholder="Enter your ticket category description here"
                      autoComplete="off"
                      value={ticket.categoryDescription}
                      onChange={(e) => handleChange(index, e)}
                      rows={3}
                    />
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="categoryStock">
                <Form.Label column sm={2}>
                  Stock
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    required
                    className="form-control-create-event"
                    type="text"
                    name="categoryStock"
                    placeholder="Enter your ticket stock here"
                    autoComplete="off"
                    value={ticket.categoryStock}
                    onChange={(e) => handleChange(index, e)}
                  />
                </Col>
              </Form.Group>
              {isUpdate ? (
                <></>
              ) : (
                <>
                  <Form.Label column sm={2}>
                    NFT
                  </Form.Label>
                  <Row className="ms-1">
                    <Col md={3} className="me-2">
                      <Form.Group
                        as={Row}
                        className="form-group files color pb-3 pt-3"
                        controlId="nftImage1"
                      >
                        <Card className="justify-content-center align-items-center card-create-ticket-nft">
                          <Form.Control
                            required
                            type="file"
                            className="create-event-upload-image"
                            name="nftImage"
                            onChange={(e) => imageChange1(index, e)}
                          />

                          {imageNFT1[index] ? (
                            <img
                              src={imageNFT1[index]}
                              className="createTicketNFT p-2"
                              alt="event_logo"
                            ></img>
                          ) : (
                            <div>
                              <Image
                                color="grey"
                                className="position-absolute top-50 start-50 translate-middle header-icon"
                              ></Image>
                            </div>
                          )}
                        </Card>
                      </Form.Group>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="nftProbability1"
                      >
                        <Form.Label
                          column
                          sm={4}
                          className="createTicketSmallText"
                        >
                          Probability
                        </Form.Label>
                        <Col sm={8}>
                          <Form.Control
                            required
                            className="form-control-create-event"
                            type="text"
                            name="nftProbability"
                            autoComplete="off"
                            onChange={(e) => handleChangeNFT1(index, e)}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col md={3} className="me-2">
                      <Form.Group
                        as={Row}
                        className="form-group files color pb-3 pt-3"
                        controlId="nftImage2"
                      >
                        <Card className="justify-content-center align-items-center card-create-ticket-nft">
                          <Form.Control
                            
                            type="file"
                            className="form-control-create-event create-event-upload-image"
                            name="nftImage"
                            onChange={(e) => imageChange2(index, e)}
                          />

                          {imageNFT2[index] ? (
                            <img
                              src={imageNFT2[index]}
                              className="createTicketNFT p-2"
                              alt="event_logo"
                            ></img>
                          ) : (
                            <div>
                              <Image
                                color="grey"
                                className="position-absolute top-50 start-50 translate-middle header-icon"
                              ></Image>
                            </div>
                          )}
                        </Card>
                      </Form.Group>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="nftProbability1"
                      >
                        <Form.Label
                          column
                          sm={4}
                          className="createTicketSmallText"
                        >
                          Probability
                        </Form.Label>
                        <Col sm={8}>
                          <Form.Control
                            
                            className="form-control-create-event"
                            type="text"
                            name="nftProbability"
                            autoComplete="off"
                            onChange={(e) => handleChangeNFT2(index, e)}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col md={3} className="me-2">
                      <Form.Group
                        as={Row}
                        className="form-group files color pb-3 pt-3"
                        controlId="nftImage3"
                      >
                        <Card className="justify-content-center align-items-center card-create-ticket-nft">
                          <Form.Control
                            
                            type="file"
                            className="form-control-create-event create-event-upload-image"
                            name="nftImage"
                            onChange={(e) => imageChange3(index, e)}
                          />

                          {imageNFT3[index] ? (
                            <img
                              src={imageNFT3[index]}
                              className="createTicketNFT p-2"
                              alt="event_logo"
                            ></img>
                          ) : (
                            <div>
                              <Image
                                color="grey"
                                className="position-absolute top-50 start-50 translate-middle header-icon"
                              ></Image>
                            </div>
                          )}
                        </Card>
                      </Form.Group>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="nftProbability1"
                      >
                        <Form.Label
                          column
                          sm={4}
                          className="createTicketSmallText"
                        >
                          Probability
                        </Form.Label>
                        <Col sm={8}>
                          <Form.Control
                            
                            className="form-control-create-event"
                            type="text"
                            name="nftProbability"
                            autoComplete="off"
                            onChange={(e) => handleChangeNFT3(index, e)}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </>
              )}
              <div className="d-flex flex-row-reverse mt-3">
                <Button
                  className="ms-2 create-ticket-button"
                  onClick={addCategory}
                >
                  <PlusLg variant="light"></PlusLg>
                </Button>
                {index !== 0 ? (
                  <Button
                    className="me-3 create-ticket-button"
                    onClick={() => removeCategory(index)}
                  >
                    <DashLg variant="light"></DashLg>
                  </Button>
                ) : (
                  <div></div>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
        <div className="d-flex flex-row-reverse mt-3">
          <Button
            variant="primary"
            type="submit"
            className="mt-2 px-4 create-event-button"

          >
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateTickets;
