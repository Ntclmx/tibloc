import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Footer, Header, EventProgress, CreateEventComp, CreateTickets } from '../../components'
import DetailEvent from '../DetailEvent'
import DashboardAdmin from '../Dashboard/DashboardAdmin';
import DashboardCustomer from '../Dashboard/DashboardCustomer';
import DashboardGuest from '../Dashboard/DashboardGuest';
import ListEvents from '../ListEvents';
import './mainApp.css';
import Faq from '../Faq';
import ChooseTicket from '../ChooseTicket'
import ListCreatedEvents from '../ListCreatedEvents'
import Wishlist from '../Wishlist'
import ChoosePayment from '../ChoosePayment'
import DetailTransaction from '../DetailTransaction'
import ListTransactions from '../ListTransactions';
import QrScan from '../QrScan';


const MainApp = () => {
    const [event, setEvent] = useState({});
    const [web3User, setWeb3User] = useState('');

    const updateEvent = (data) => {
        setEvent((prevEvent) => {
            return {
                ...prevEvent,
                ...data
            };
        });

    };

    return (
        <div className='main-app-wrapper '>
            <UserContext.Provider value={{ web3User, setWeb3User }}>
                <div className='header-wrapper'>
                    <Header />
                </div>

            </UserContext.Provider>

            <Router>
                <UserContext.Provider value={{ web3User, setWeb3User }}>
                    <Switch>
                        <Route path='/events'>
                            <div className='mx-5' >
                                <div className='justify-content-center align-items-center my-3 pt-3 '>
                                    <ListEvents />
                                </div>
                            </div>
                        </Route>
                        <Route path='/transaction/:id'>
                            <div className='mx-5' >
                                <div className='justify-content-center align-items-center my-3 pt-3 '>
                                    <DetailTransaction />
                                </div>
                            </div>
                        </Route>
                        <Route path='/transactions'>
                            <div className='mx-5' >
                                <div className='justify-content-center align-items-center my-3 pt-3 '>
                                    <ListTransactions />
                                </div>
                            </div>
                        </Route>
                        <Route path='/dashboard'>
                            <div className='mx-5' >
                                <div className='justify-content-center align-items-center my-3 pt-3 '>
                                    <DashboardCustomer />
                                </div>
                            </div>
                        </Route>
                        <Route path='/dashboard-admin'>
                            <div className='mx-5' >
                                <div className='justify-content-center align-items-center my-3 pt-3 '>
                                    <DashboardAdmin />
                                </div>
                            </div>
                        </Route>
                        <Route path='/faq'>
                            <div className='mx-5' >
                                <div className='justify-content-center align-items-center my-3 pt-3 '>
                                    <Faq />
                                </div>
                            </div>
                        </Route>
                        <Route path='/event/:id/categories/:catId/payment'>
                            <div className='mx-5' >
                                <div className='justify-content-center align-items-center my-3 pt-3 '>
                                    <ChoosePayment />
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
                        <Route path='/edit-event'>
                            <div className='mx-5' >
                                <div className='justify-content-center align-items-center my-3 pt-3 '>
                                    <Route render={(props) => (
                                        <div>
                                            <EventProgress />
                                            <CreateTickets {...props} event={event} updateEvent={updateEvent} />
                                        </div>
                                    )}
                                        path="/edit-event/tickets/:id?" >
                                    </Route>
                                    <Route render={(props) => (
                                        <div>
                                            <EventProgress />
                                            <CreateEventComp {...props} event={event} updateEvent={updateEvent} />
                                        </div>
                                    )}
                                        path="/edit-event/events/:id?" >
                                    </Route>
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
                        <Route path='/qr'>
                            <div className='mx-5' >
                                <div className='justify-content-center align-items-center my-3 pt-3 '>
                                    <QrScan />
                                </div>
                            </div>
                        </Route>
                        <Route path='/'>
                            <div className='' >
                                <div className='justify-content-center align-items-center mb-3 '>
                                    <DashboardGuest />
                                </div>
                            </div>
                        </Route>
                        {/* <Route path='/'>
                            <div className='mx-5' >
                                <div className='justify-content-center align-items-center my-3 pt-3 '>
                                    <p>404 NOT FOUND</p>
                                </div>
                            </div>
                        </Route> */}

                    </Switch>
                </UserContext.Provider>
            </Router>
            <div className='footer-wrapper'>
                <Footer />
            </div>
        </div>
    )
}

//test
export const UserContext = React.createContext(null);
export default MainApp