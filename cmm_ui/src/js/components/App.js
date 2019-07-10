import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles'
import {Typography, TextField, Button, Link, Paper} from '@material-ui/core'
// import {BrowserRouter as Router, Link, Switch, Route, Redirect} from 'react-router-dom'
import logo from '../../images/logo.svg';
import '../../css/App.css';
import axios from 'axios';

export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: ['Click Logo To See Users'],
            logInEmail: '',
            logInPassword: '',
            authtoken: null,
            signUp: true
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
        axios.post(`http://cmm-api:3000/sessions/login?email=${email}&password=${password}`).then(res => {
            this.setState({authtoken: res.data.authentication_token})
        }).catch(err => {
            console.log('There was an unknown error loggin in')
        })
    };

    switchLogInSignUp() {
        this.setState({signUp: !this.state.signUp})
    }

    render() {
        // if (this.state.authtoken === null || this.state.authtoken === undefined) {
        //
        // }
        return (
            <div className="App" id={"app"}>
                <LogIn classes={this.props.classes} logInEmail={this.state.logInEmail}
                       logInPassword={this.state.logInPassword} signUp={this.state.signUp}
                       authtoken={this.state.authtoken} handleClick={this.handleClick}
                       switchLogInSignUp={this.switchLogInSignUp} handleChange={this.handleChange}/>
                <GetUsers users={this.state.users} classes={this.props.classes} getUsers={this.getUsers}
                          authtoken={this.state.authtoken}/>
            </div>
        );
    }

}

const LogIn = (props) => {
    // TODO add error state when wrong pass is entered
    if (props.authtoken !== null && props.authtoken !== undefined) {
        return (<></>)
    }
    else {
        // TODO already a user message should go away if loggin in. change button name accordingly
        return (
            <div className={props.classes.logIn}>
                <Paper className={props.classes.paper}>
                    <div>
                        <TextField
                            id={"logInEmail"}
                            label={"Email"}
                            className={props.classes.logInEmail}
                            value={props.logInEmail === undefined ? '' : props.logInEmail}
                            onChange={props.handleChange}
                        >
                        </TextField>

                        <TextField
                            id={"logInPassword"}
                            label={"Password"}
                            className={props.classes.logInPassword}
                            value={props.logInPassword === undefined ? '' : props.logInPassword}
                            onChange={props.handleChange}
                        >
                        </TextField>
                    </div>
                    <div>
                        <SignInLogInButton signUp={props.signUp} handleClick={props.handleClick}
                                           classes={props.classes}/>
                    </div>
                    <Typography>Already Have An Account?</Typography>
                    <Link onClick={props.switchLogInSignUp}>Log In</Link>
                </Paper>
            </div>
        )
    }

};

const GetUsers = (props) => {
    if (props.authtoken === null || props.authtoken === undefined) {
        return <></>
    }
    else {
        return (
            <div className="GetUsers" id={"getUsers"}>
                <header className="App-header" id={"appHeader"}>
                    {props.users.map((user, i) => {
                        return <Typography key={`user${i}`}>{user}</Typography>
                    })}
                    <div className={props.classes.logoDiv} id={"logoDiv"} onClick={props.getUsers}>
                        <img src={logo} id={"logoImage"} className="App-logo" alt="logo"/>
                    </div>
                </header>
            </div>
        )
    }
};

const SignInLogInButton = (props) => {
    if (props.signUp)
        return <Button className={props.classes.button} onClick={props.handleClick} variant="contained">Sign
            Up</Button>;
    else
        return <Button className={props.classes.button} onClick={props.handleClick} variant="contained">Log In</Button>;
};

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
