import React, {Component} from 'react';
import {Typography} from '@material-ui/core'
// import axios from 'axios'
// import {BrowserRouter, Link, Switch, Route, Redirect} from 'react-router-dom'
import logo from '../../images/logo.svg';
import '../../css/App.css';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: 'Jonny B',
        };

        this.getUsers = this.getUsers.bind(this)
    }

    getUsers() {

    }

    render() {
        return (
                <div className="App">
                    {/*<BrowserRouter>Put Content in Here</BrowserRouter>*/}
                    <header className="App-header">
                        <Typography>{this.state.users}</Typography>
                        <img src={logo} className="App-logo" alt="logo"/>
                    </header>
                    {/*<Switch>*/}
                        {/*<Route path={'/'} component={App}/>*/}
                    {/*</Switch>*/}
                </div>
        );
    }

}