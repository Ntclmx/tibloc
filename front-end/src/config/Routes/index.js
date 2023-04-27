import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {  MainApp } from '../../pages';
import Axios from 'axios';
const Routes = () => {

    const token = localStorage.getItem('token');
    Axios.defaults.headers.common['x-access-token'] = `${token}`;
    return (
        <Router>
            <Switch>
                <Route path='/'>
                    <MainApp/>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes