import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles'
import LogIn from './LogIn'
import GetUsers from './GetUsers'
import '../../css/App.css';
import axios from 'axios';
import Cookies from 'universal-cookie'

// TODO add expiring cookie
export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: ['Click Logo To See Users'],
            logInEmail: '',
            logInPassword: '',
            signUpUserName: '',
            currentUserName: '',
            isSignUp: true
        };

        this.getUsers = this.getUsers.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.switchLogInSignUp = this.switchLogInSignUp.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    getUsers() {
        axios.get(`http://cmm-api:3000/users?authtoken=${cookies.get('authtoken')}`).then(res => {
            if (res.data === "unauthorized")
                cookies.remove('authtoken');
            else
                this.setState({users: res.data})
        })
    }

    handleChange = event => {
        this.setState({[event.target.id]: event.target.value})
    };

    handleClick = event => {

        let email = this.state.logInEmail.trim();
        let password = this.state.logInPassword.trim();
        let name = this.state.signUpUserName.trim();

        if (event.target.innerText === 'SIGN UP') {
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
                    cookies.set('authtoken', res.data.authentication_token, {
                        path: '/',
                        expires: new Date(Date.now() + 900000)
                    });
                    this.setState({currentUserName: res.data.name})
                }
                else {
                    window.alert("Incorrect User Name and Password Combination");
                }
            }).catch(err => {
                window.alert("Incorrect User Name and Password Combination");
            })
        }
        else {
            axios.delete(`http://cmm-api:3000/sessions/logout?authtoken=${cookies.get('authtoken')}`).then(res => {
                window.alert("Successfully Logged Out");
                this.setState({currentUserName: ''});
                cookies.delete('authtoken')
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
                       isSignUp={this.state.isSignUp} handleClick={this.handleClick}
                       switchLogInSignUp={this.switchLogInSignUp} handleChange={this.handleChange} cookies={cookies}/>
                <GetUsers users={this.state.users} getUsers={this.getUsers} handleClick={this.handleClick}
                          currentUserName={this.state.currentUserName} cookies={cookies}/>
            </div>
        );
    }

}

export const cookies = new Cookies();

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
