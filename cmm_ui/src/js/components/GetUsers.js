import {Typography, Button, Grid} from "@material-ui/core";
import React from "react";
import {withStyles} from "@material-ui/core/styles";

const GetUsers = (props) => {
    return (
        <div className="body" id={"getUsers"}>
            <header className="App-header" id={"appHeader"}>
                <Grid container justify={"center"} alignItems={"center"}>
                    <Grid item xs={12}>
                        <Typography className={props.classes.greeting}>Jon's Diaper Party</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={props.classes.greeting}>To help us know how much food to buy</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={props.classes.greeting}>Select how many of each you want (up to three)</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={() => {
                            props.handleClick('hotdog','subtract/hotdog')
                        }} className={props.classes.button} id={'subtract/hotdog'}>-</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Hot Dog</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={() => {
                            props.handleClick('hotdog', 'add/hotdog')
                        }} className={props.classes.button} id={'add/hotdog'}>+</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>{props.hotdog}</Typography>
                    </Grid>

                    <Grid item xs={3}>
                        <Button onClick={() => {
                            props.handleClick('burger','subtract/burger')
                        }} className={props.classes.button} id={'subtract/burger'}>-</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Not Hotdog (aka Burger)</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={() => {
                            props.handleClick('burger', 'add/burger')
                        }} className={props.classes.button} id={'add/burger'}>+</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>{props.burger}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={props.classes.greeting}>Also hidden somewhere on this site is an easter egg. If someone finds it they get a $5 gift card!</Typography>
                    </Grid>
                </Grid>
            </header>
        </div>
    )
};

const styles = {
    body: {
        backgroundColor: '#282c34'
    },
    button: {
        backgroundColor: 'lightblue',
        marginLeft: '15px',
        marginRight: '15px'
    }
};

export default withStyles(styles)(GetUsers)
