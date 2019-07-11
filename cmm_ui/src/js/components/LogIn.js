import {Button, Link, Paper, TextField, Typography} from "@material-ui/core";
import React from "react";
import {withStyles} from "@material-ui/core/styles";

const LogIn = (props) => {
    // TODO add error state when wrong pass is entered
    if (props.cookies.get('authtoken') !== null && props.cookies.get('authtoken') !== undefined) {
        return (<></>)
    }
    else {
        // TODO already a user message should go away if loggin in. change button name accordingly
        return (
            <div className={props.classes.logIn}>
                <Paper className={props.classes.paper}>
                    <div>
                        <UserNameField isSignUp={props.isSignUp} classes={props.classes} signUpUserName={props.signUpUserName} handleChange={props.handleChange}/>
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
                        <LogInSignUp classes={props.classes} isSignUp={props.isSignUp} handleClick={props.handleClick}
                                     switchLogInSignUp={props.switchLogInSignUp}/>
                    </div>

                </Paper>
            </div>
        )
    }

};

const UserNameField = (props) => {
    if (props.isSignUp) {
        return (
            <TextField
                id={"signUpUserName"}
                label={"User Name"}
                className={props.classes.signUpUserName}
                value={props.signUpUserName === undefined ? '' : props.signUpUserName}
                onChange={props.handleChange}
            >
            </TextField>
        )
    }
    else {
        return <></>
    }
};

const LogInSignUp = (props) => {
    if (props.isSignUp) {
        return (
            <div>
                <div>
                    <Button className={props.classes.button} onClick={props.handleClick}
                            variant="contained">Sign
                        Up</Button>
                </div>
                <Typography>Already Have An Account?</Typography>
                <Link onClick={props.switchLogInSignUp}>Log In</Link>
            </div>
        )
    }
    else {
        return (
            <div>
                <div>
                    <Button className={props.classes.button} onClick={props.handleClick}
                            variant="contained">Log In</Button>
                </div>
                <Link onClick={props.switchLogInSignUp}>Sign Up</Link>
            </div>
        )
    }

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
    signUpUserName: {
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

export default withStyles(styles)(LogIn)
