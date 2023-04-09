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
    <Row className="">
      {events.map(event => {
        console.log(typeof (event));
        return <EventCard
          key={event._id}
          eventLogo={`http://127.0.0.1:4000/${event.eventLogo}`}
          eventTitle={event.eventTitle}
          eventDate={event.eventDate}
          _id={event._id}
          eventOrganizer={event.eventOrganizer}
          eventAddress={event.eventAddress}
          eventCategory={event.eventCategory}
          dashboard={true}
        />
      })}
    </Row>
  );
};

function HomeTabs() {
  return (
    <div className='px-5'>

      <Tabs
        defaultActiveKey="recommendation"
        id="fill-tab-example"
        className="mb-3 my-5 d-flex justify-content-center align-items-center"
        fill

      >
        <Tab eventKey="recommendation" title="RECOMMENDATION">
          <ComponentEvents />
        </Tab>
        <Tab eventKey="comedy" title="Comedy">
          <ComponentEvents />
        </Tab>
        <Tab eventKey="music" title="Music">
          <ComponentEvents />
        </Tab>
        <Tab eventKey="sport" title="Sport">
          <ComponentEvents />
        </Tab>
        <Tab eventKey="fng" title="Fun & Games">
          <ComponentEvents />
        </Tab>
      </Tabs>
    </div>
  );
}

export default HomeTabs;
