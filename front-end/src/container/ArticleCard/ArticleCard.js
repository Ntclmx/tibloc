import React, { useEffect, useState } from "react";
import Axios from 'axios';
import BasicCard from "../../components/BasicCard";
import Row from "react-bootstrap/esm/Row";


const ArticleCard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/v1/events`)
      .then((result) => {
        const responseAPI = result.data;
        setEvents(responseAPI.events);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //d-flex flex-row flex-nowrap overflow-auto

  return (
    <div className="mx-5 px-5">
      <h1 className="mt-5 mb-2 dashboardTextBold">Learn More</h1>
      <Row className="d-flex flex-row flex-nowrap overflow-auto ">
        {events.map((event) => {
          return (
            <BasicCard
              img={`${process.env.REACT_APP_API_URL}/${event.eventLogo}`}
              title={event.eventTitle}
              text={event.eventDate}
              alt="alt aja"
            />
          );
        })}
      </Row>
    </div>
  );
};

export default ArticleCard;
