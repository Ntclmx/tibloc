import React, { useEffect, useState } from "react";
import Axios from 'axios';
import BasicCard from "../../components/BasicCard";
import Row from "react-bootstrap/esm/Row";


const ArticleCard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Axios.get("http://127.0.0.1:4000/v1/events")
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
    <Row className="d-flex flex-row flex-nowrap overflow-auto">
      {events.map((event) => {
        return (
          <BasicCard
            img={`http://127.0.0.1:4000/${event.eventLogo}`}
            title={event.eventTitle}
            text={event.eventDate}
            alt="alt aja"
          />
        );
      })}
    </Row>
  );
};

export default ArticleCard;
