import React, { Component } from 'react';
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
    let assignments = this.state.assignments.map((assignment) => {
      return (
            <h1>
              <a href={assignment.link}>{assignment.text}</a>
            </h1>
      )
    });
    return (
      <div>
        {assignments}
      </div>
    );
  }
}
export default App;
