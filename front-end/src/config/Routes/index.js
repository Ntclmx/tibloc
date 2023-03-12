import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SignIn, MainApp, SignUp } from '../../pages';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path='/sign-in'>
                    <SignIn/>
                </Route>
                <Route path='/sign-up'>
                    <SignUp/>
                </Route>
                <Route path='/'>
                    <MainApp/>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes