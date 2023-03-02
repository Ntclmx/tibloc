import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Row from 'react-bootstrap/Row';
import Axios from 'axios';
import { EventCard } from "../../components";

const ComponentEvents = () => {
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

  return (
    <Row>
      {events.map((event) => {
        console.log(typeof event);
        return (
          <EventCard col="col-3"
            key={event._id}
            eventLogo={`http://127.0.0.1:4000/${event.eventLogo}`}
            eventTitle={event.eventTitle}
            eventDate={event.eventDate}
          />
        );
      })}
    </Row>
  );
};

function HomeTabs() {
  return (
    <Tabs
      defaultActiveKey="recommendation"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="recommendation" title="RECOMMENDATION">
        <ComponentEvents />
      </Tab>
      <Tab eventKey="comedy" title="Comedy">
        <ComponentEvents/>
      </Tab>
      <Tab eventKey="music" title="Music">
        <ComponentEvents/>
      </Tab>
      <Tab eventKey="sport" title="Sport">
        <ComponentEvents/>
      </Tab>
      <Tab eventKey="fng" title="Fun & Games">
        <ComponentEvents/>
      </Tab>
    </Tabs>
  );
}

export default HomeTabs;
