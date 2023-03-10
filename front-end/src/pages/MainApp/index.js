import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Footer, Header, EventProgress, CreateEventComp, CreateTickets } from '../../components'
import DetailEvent from '../DetailEvent'
import Home from '../Home'
import ListEvents from '../ListEvents';
import './mainApp.css';
import Article from '../Article';
import ChooseTicket from '../ChooseTicket';
import ListCreatedEvents from '../ListCreatedEvents';
import Wishlist from '../Wishlist'

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
                <Header />
            </div>

            <Router>
                <Switch>
                    <Route path='/home'>
                        <div className='mx-5' >
                            <div className='justify-content-center align-items-center my-3 pt-3 '>
                                <Home />
                            </div>
                        </div>
                    </Route>
                    <Route path='/article'>
                        <div className='mx-5' >
                            <div className='justify-content-center align-items-center my-3 pt-3 '>
                                <Article />
                            </div>
                        </div>
                    </Route>
                    <Route path='/event/:id/categories'>
                        <div className='mx-5' >
                            <div className='justify-content-center align-items-center my-3 pt-3 '>
                                <ChooseTicket />
                            </div>
                        </div>
                    </Route>
                    <Route path='/event/:id'>
                        <DetailEvent />
                    </Route>
                    <Route path='/create-event'>
                        <div className='mx-5' >
                            <div className='justify-content-center align-items-center my-3 pt-3 '>
                                <EventProgress />
                                <Route render={(props) => (
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
                            </div>
                        </div>
                    </Route>
                    <Route path='/events'>
                        <div className='mx-5' >
                            <div className='justify-content-center align-items-center my-3 pt-3 '>
                                <ListEvents />
                            </div>
                        </div>
                    </Route>
                    <Route path='/list-created'>
                        <div className='mx-5' >
                            <div className='justify-content-center align-items-center my-3 pt-3 '>
                                <ListCreatedEvents />
                            </div>
                        </div>
                    </Route>
                    <Route path='/wishlist'>
                        <div className='mx-5' >
                            <div className='justify-content-center align-items-center my-3 pt-3 '>
                                <Wishlist />
                            </div>
                        </div>
                    </Route>
                </Switch>
            </Router>
            <div className='footer-wrapper'>
                <Footer />
            </div>
        </div>
    )
}

export default MainApp