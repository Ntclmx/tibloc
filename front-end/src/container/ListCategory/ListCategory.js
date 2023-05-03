import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Row from 'react-bootstrap/Row';
import Axios from 'axios';
import './ListCategory.css';
import { EventCard } from "../../components";

const ComponentEvents = (props) => {
  const [events, setEvents] = useState([]);
  const [all, setAll] = useState(true);
  const [filter, setFilter] = useState('');

  const allLocation = [
    { name: "Jakarta", checked: false },
    { name: "Bogor", checked: false },
    { name: "Depok", checked: false },
    { name: "Tangerang", checked: false },
  ]

  const allCategories = [

    { name: "Comedy", checked: false },
    { name: "Music", checked: false },
    { name: "Sport", checked: false },
    { name: "Fun&Games", checked: false },
  ]

  const [locs, setLoc] = useState(allLocation);
  const [cats, setCat] = useState(allCategories);

  console.log(props);

  useEffect(() => {
    if (props.cats) {
      setAll(false)
      setFilter('category');
      setCat(
        cats.map((cat, currentIndex) =>
          currentIndex === props.index
            ? { ...cat, checked: !cat.checked }
            : cat
        )
      )
    }

  }, [])

  useEffect(() => {

    Axios.get(`${process.env.REACT_APP_API_URL}/v1/events?perPage=8`)
      .then((result) => {
        const responseAPI = result.data;
        setEvents(responseAPI.events);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cats, props.cats, props.index]);



  return (
    <Row className="">
      {events.map(event => {
        console.log(typeof (event));
        return <EventCard
          key={event._id}
          eventLogo={`${process.env.REACT_APP_API_URL}/${event.eventLogo}`}
          eventTitle={event.eventTitle}
          eventDate={event.eventDate}
          _id={event._id}
          eventOrganizer={event.eventOrganizer}
          eventAddress={event.eventAddress}
          eventCategory={event.eventCategory}
          // dashboard={true}
          dashboard={all}
          cats={cats}
          filter={filter}
          locs={locs}
          locsQuery={''}
          catsQuery={''}
        />
      })}
    </Row>
  );
};

function HomeTabs() {
  return (
    <div className='px-5 mx-5'>

      <Tabs
        defaultActiveKey="recommendation"
        id="fill-tab-example"
        className="mb-3 my-5 d-flex justify-content-center align-items-center"
        fill

      >
        <Tab eventKey="recommendation" title="RECOMMENDATION">
          <ComponentEvents cats={null}></ComponentEvents>
        </Tab>
        <Tab eventKey="comedy" title="Comedy">
          <ComponentEvents cats={'Comedy'} index={0} />
        </Tab>
        <Tab eventKey="music" title="Music">
          <ComponentEvents cats={'Music'} index={1} />
        </Tab>
        <Tab eventKey="sport" title="Sport">
          <ComponentEvents cats={'Sport'} index={2} />
        </Tab>
        <Tab eventKey="fng" title="Fun & Games">
          <ComponentEvents cats={'Fun&Games'} index={3} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default HomeTabs;
