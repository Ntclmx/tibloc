import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Footer, Header } from '../../components'
import CreateEvent from '../CreateEvent'
import DetailEvent from '../DetailEvent'
import Home from '../Home'
import ListEvents from '../ListEvents'
import './mainApp.css'
import Container from 'react-bootstrap/Container';

const MainApp = () => {
  return (
    <div className='main-app-wrapper '>
        <div className='header-wrapper'>
            <Header/>
        </div>
        <Container>
            <div className='content-wrapper d-flex justify-content-center align-items-center my-3 pt-3'>
                <Router>
                    <Switch>
                        <Route path='/home'>
                            <Home/>
                        </Route>
                        <Route path='/create-event'>
                            <CreateEvent/>
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
        </Container>
        <div className='footer-wrapper'>
            <Footer/>
        </div>
    </div>
  )
}

export default MainApp