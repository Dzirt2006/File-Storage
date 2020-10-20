import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './home';
import Navbar from './navbar';
import SignUp from './signUp';

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
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={SignUp} />
            </Switch>
        </Router>
    )
}

export default Routes;