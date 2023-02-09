import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Footer, Header } from '../../components'
import CreateEvent from '../CreateEvent'
import DetailEvent from '../DetailEvent'
import Home from '../Home'

const MainApp = () => {
  return (
    <div>
        <Header/>
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
            </Switch>
        </Router>
        {/* <Footer/> */}
    </div>
  )
}

export default MainApp