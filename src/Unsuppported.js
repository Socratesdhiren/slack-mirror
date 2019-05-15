import React, { Component } from 'react';
import './App.css';
import Channel from "./channel/Channel";

class Unsuppported extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                   <h3> Your Browser is not supported, You need to have at least internet explorer version 10 or above.</h3>
                </header>
            </div>
        );
    }
}

export default Unsuppported;
