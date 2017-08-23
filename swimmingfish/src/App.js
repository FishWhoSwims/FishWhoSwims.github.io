import React, { Component } from 'react';
import Assignments from './Assignments/Assignments.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      assignments: [
        {
          text: "Senior Design Mini Project Web",
          link: "https://github.com/SwimmingFishSeniorDesign/SwimmingFishWeb"
        }
      ]
    };
  }

  render() {
    return <Assignments/>
  }
}
export default App;
