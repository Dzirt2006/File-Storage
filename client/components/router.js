import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './home';
import Navbar from './navbar';
import SignUp from './signUp';
import ServicePage from './serviseRegistration';

const Routes = () => {
    return (
        <Router>
            <Navbar/>
            <div>
                <br />
                <center>
                    <h2>MyAuth</h2>
                    <p>secured login for all</p>
                </center>
            </div>
            <br />
            <br />
            <Switch>
                <Route exact path="/:id?" component={Home} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/services/:id" component={ServicePage} />
            </Switch>
        </Router>
    )
}

export default Routes;