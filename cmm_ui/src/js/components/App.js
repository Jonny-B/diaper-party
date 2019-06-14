import React, {Component} from 'react';
import {Typography} from '@material-ui/core'
import axios from 'axios'
// import {BrowserRouter, Link, Switch, Route, Redirect} from 'react-router-dom'
import logo from '../../images/logo.svg';
import '../../css/App.css';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: 'Click Logo To Find Users',
        };

        this.getUsers = this.getUsers.bind(this)
    }

    getUsers() {
        axios.get('cmm-api:3000/users').then(response => {
            this.setState({users: response})
        })
    }

    render() {
        return (
            <div className="App" id={"app"}>
                {/*<BrowserRouter>Put Content in Here</BrowserRouter>*/}
                <header className="App-header" id={"appHeader"}>
                    <Typography>{this.state.users}</Typography>
                    <div id={"logoDiv"} onClick={this.getUsers}>
                        <img src={logo} id={"logoImage"} className="App-logo" alt="logo"/>
                    </div>
                </header>
                {/*<Switch>*/}
                {/*<Route path={'/'} component={App}/>*/}
                {/*</Switch>*/}
            </div>
        );
    }

}