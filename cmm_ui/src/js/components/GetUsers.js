import {Typography, Link} from "@material-ui/core";
import logo from "../../images/logo.svg";
import React from "react";
import {withStyles} from "@material-ui/core/styles";

const GetUsers = (props) => {
    if (props.authtoken === null || props.authtoken === undefined) {
        return <></>
    }
    else {
        return (
            <div className="GetUsers" id={"getUsers"}>
                <header className="App-header" id={"appHeader"}>
                    <Typography className={props.classes.greeting}>{`Hello ${props.currentUserName}`}</Typography>
                    {props.users.map((user, i) => {
                        return <Typography key={`user${i}`}>{user}</Typography>
                    })}
                    <div className={props.classes.logoDiv} id={"logoDiv"} onClick={props.getUsers}>
                        <img src={logo} id={"logoImage"} className="App-logo" alt="logo"/>
                    </div>
                    <Link onClick={props.handleClick}>Log Out</Link>
                </header>
            </div>
        )
    }
};

const styles = {
    logoDiv: {
        margin: '15px'
    },
    greeting: {
        margin: '15px'
    }
};

export default withStyles(styles)(GetUsers)
