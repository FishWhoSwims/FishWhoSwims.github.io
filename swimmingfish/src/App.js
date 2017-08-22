import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.items = firebase.database().ref('/items');
    this.state = {

    };
  }

  render() {
    return (
      <h1> hello world </h1>
    );
  }
}
export default App;
