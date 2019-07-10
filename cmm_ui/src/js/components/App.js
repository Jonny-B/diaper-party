import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles'
import {Typography, TextField, Button, Link, Paper} from '@material-ui/core'
// import {BrowserRouter as Router, Link, Switch, Route, Redirect} from 'react-router-dom'
import logo from '../../images/logo.svg';
import LogIn from './LogIn'
import GetUsers from './GetUsers'
import '../../css/App.css';
import axios from 'axios';

// TODO add expiring cookie
// https://stackoverflow.com/questions/39826992/how-can-i-set-a-cookie-in-react
export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: ['Click Logo To See Users'],
            logInEmail: '',
            logInPassword: '',
            signUpUserName: '',
            currentUserName: '',
            authtoken: null,
            isSignUp: true
        };

        this.getUsers = this.getUsers.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.switchLogInSignUp = this.switchLogInSignUp.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    getUsers() {
        axios.get(`http://cmm-api:3000/users?authtoken=${this.state.authtoken}`).then(res => {
            if (res.data === "unauthorized")
                this.setState({authtoken: null});
            else
                this.setState({users: res.data})
        })
    }

    handleChange = event => {
        this.setState({[event.target.id]: event.target.value})
    };

    handleClick = event => {

        let email = this.state.logInEmail;
        let password = this.state.logInPassword;
        let name = this.state.signUpUserName;

        if (event.target.innerText === 'SIGN UP') {
            let email = this.state.logInEmail.trim();
            let password = this.state.logInPassword.trim();
            let name = this.state.signUpUserName.trim();

            if (email !== '' || password !== '' || name !== '') {
                axios.post(`http://cmm-api:3000/createUser?user=${name}&email=${email}&password=${password}`).then((res) => {
                    window.alert("Congrats You Have Created a New Account!");
                    this.setState({isSignUp: false});
                })
            }
            else {
                window.alert("Please Ensure you have filled out all fields");
            }
        }
        else if (event.target.innerText === 'LOG IN') {
            axios.post(`http://cmm-api:3000/sessions/login?email=${email}&password=${password}`).then(res => {
                if (res.data !== 'unauthorized') {
                    this.setState({authtoken: res.data.authentication_token, currentUserName: res.data.name})
                }
                else {
                    window.alert("Incorrect User Name and Password Combination");
                }
            }).catch(err => {
                window.alert("Incorrect User Name and Password Combination");
            })
        }
        else {
            axios.delete(`http://cmm-api:3000/sessions/logout?authtoken=${this.state.authtoken}`).then(res => {
                window.alert("Successfully Logged Out");
                this.setState({authtoken: null, currentUserName: ''})
            }).catch(err => {
                console.log(err)
            })
        }
    };

    switchLogInSignUp() {
        this.setState({isSignUp: !this.state.isSignUp})
    }

    render() {
        return (
            <div className="App" id={"app"}>
                <LogIn classes={this.props.classes} logInEmail={this.state.logInEmail}
                       logInPassword={this.state.logInPassword} signUpUserName={this.state.signUpUserName}
                       isSignUp={this.state.isSignUp}
                       authtoken={this.state.authtoken} handleClick={this.handleClick}
                       switchLogInSignUp={this.switchLogInSignUp} handleChange={this.handleChange}/>
                <GetUsers users={this.state.users} getUsers={this.getUsers} handleClick={this.handleClick}
                          authtoken={this.state.authtoken} currentUserName={this.state.currentUserName}/>
            </div>
        );
    }

}

const styles = {
    logoDiv: {
        margin: '15px'
    },
    logIn: {
        width: '500px',
        marginTop: '255px',
        marginLeft: '680px'
    },
    logInEmail: {
        margin: '8px'
    },
    logInPassword: {
        margin: '8px'
    },
    button: {
        margin: '8px'
    },
    paper: {
        padding: '8px',
        margin: '20px'
    }
};

export default withStyles(styles)(App)
