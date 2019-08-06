import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles'
import axios from 'axios'
import GetUsers from './GetUsers'
import Collection from 'ruby-script'
import '../../css/App.css';

export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotdog: 0,
            burger: 0
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        axios.get(`http://localhost:3000/count`).then(res => {
            this.setState({hotdog: res.data[0], burger: res.data[1]});
        });

        if (document.cookie.includes('votes') !== true) {
            document.cookie = 'votes=0; expires=Fri, 19 Aug 2019 23:59:59 GMT'
        }

        document.cookie = 'secretVisible=false';
    }

    handleClick = (value, url) => {
        let collection = new Collection(document.cookie.split(';'));
        let votes = parseInt(collection[collection.find_index((s) => {
            return s.includes('votes')
        })].split('=')[1]);


        if (votes < 3 && url.includes('add')) {
            axios.post(`http://localhost:3000/${url}`).then(res => {
                if (value === 'hotdog') {
                    this.setState({hotdog: res.data})
                } else {
                    this.setState({burger: res.data})
                }
            });

            document.cookie = `votes=${votes + 1}; expires=Fri, 19 Aug 2019 23:59:59 GMT`
        }
        if (votes > 0 && url.includes('subtract')) {
            axios.post(`http://localhost:3000/${url}`).then(res => {
                if (value === 'hotdog') {
                    this.setState({hotdog: res.data})
                } else {
                    this.setState({burger: res.data})
                }
            });

            document.cookie = `votes=${votes - 1}; expires=Fri, 19 Aug 2019 23:59:59 GMT`
        }

    };

    render() {
        return (
            <div className="App" id={"app"}>
                <GetUsers handleClick={this.handleClick} burger={this.state.burger} hotdog={this.state.hotdog}/>
            </div>
        );
    }

}

const styles = {
    paper: {
        padding: '8px',
        margin: '20px'
    }
};

export default withStyles(styles)(App)
