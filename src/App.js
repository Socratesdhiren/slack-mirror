import React, { Component } from 'react';
import './App.css';
import {GrandMother} from "./mother/GrandMother";

class App extends Component {
    state ={
        name:'Dhiren' ,
        age: 25,
        cool:true
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <GrandMother/>
        </header>
      </div>
    );
  }
}

export default App;
