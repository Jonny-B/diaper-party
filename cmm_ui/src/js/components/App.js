import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'
import axios from 'axios'
// import {BrowserRouter, Link, Switch, Route, Redirect} from 'react-router-dom'
import logo from '../../images/logo.svg';
import '../../css/App.css';

export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: ['Click Logo To Find Users'],
        };

        this.getUsers = this.getUsers.bind(this)
    }

    getUsers() {
        axios.get('http://cmm-api:3000/users').then(response => {
            this.setState({users: response.data})
        })
    }

    render() {
        return (
            <div className="App" id={"app"}>
                {/*<BrowserRouter>Put Content in Here</BrowserRouter>*/}
                <header className="App-header" id={"appHeader"}>
                    {this.state.users.map((user, i) => {
                        return <Typography key={`user${i}`}>{user}</Typography>
                    })}
                    <div className={this.props.classes.logoDiv} id={"logoDiv"} onClick={this.getUsers}>
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

const styles = {
    logoDiv: {
      margin: '15px'
  }
};

export default withStyles(styles)(App)
