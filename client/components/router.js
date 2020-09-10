import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './home';
import Navbar from './navbar';

const Routes = () => {
    return (
        <Router>
            <Navbar/>
            <div>
                <br />
                <center>
                    <h2>Cloudy</h2>
                </center>
            </div>
            <br />
            <br />
            <Switch>
                <Route exact path="/home" component={Home} />
            </Switch>
        </Router>
    )
}

export default Routes;