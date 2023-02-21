import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Footer, Header, EventProgress, CreateEventComp, CreateTickets } from '../../components'
import DetailEvent from '../DetailEvent'
import Home from '../Home'
import ListEvents from '../ListEvents';
import './mainApp.css'
import Container from 'react-bootstrap/Container';
import Article from '../Article'

const MainApp = () => {
    const [event, setEvent] = useState({});

    const updateEvent = (data) => {
        setEvent((prevEvent) => {
            return {
              ...prevEvent,
              ...data
            };
          });

    };

    console.log(event);

  return (
    <div className='main-app-wrapper '>
        <div className='header-wrapper'>
            <Header/>
        </div>
        <div className='mx-5' >
            <div className='content-wrapper justify-content-center align-items-center my-3 pt-3 '>
                <Router>
                    <Switch>
                        <Route path='/home'>
                            <Home/>
                        </Route>
                        <Route path='/article'>
                            <Article/>
                        </Route>
                        <Route path='/create-event'>
                            <EventProgress />
                            <Route  render={(props) => (
                                <CreateTickets {...props} event={event} updateEvent={updateEvent} />
                                )}
                                path="/create-event/tickets" >
                            </Route>
                            <Route render={(props) => (
                                <CreateEventComp {...props} event={event} updateEvent={updateEvent} />
                                )}
                                path="/create-event/events"
                                >
                            </Route>
                        </Route>
                        <Route path='/detail-event'>
                            <DetailEvent/>
                        </Route>
                        <Route path='/events'>
                            <ListEvents/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </div>
        <div className='footer-wrapper'>
            <Footer/>
        </div>
    </div>
  )
}

export default MainApp