import React, { Component } from 'react';
import './App.css';
import Channel from "./channel/Channel";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <Channel/>
        </header>
      </div>
    );
  }
}

export default App;
