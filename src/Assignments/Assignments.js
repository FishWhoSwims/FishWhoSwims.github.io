import React, { Component } from 'react'
import './Assignments.css'

class Assignments extends Component {
    constructor() {
        super()
        this.state = {
            assignments: [
                {
                    text: 'Senior Design Mini Project Web',
                    link: 'https://github.com/SwimmingFishSeniorDesign/SwimmingFishWeb',
                    key: 1
                }
            ]
        }
    }

    render() {
        let keyCounter = 1
        let assignments = this.state.assignments.map((assignment) => {
            return (
                <li key={assignment.key || keyCounter++}>
                    <a href={assignment.link}>{assignment.text}</a>
                </li>
            )
        })
        return (
            <ul>
                {assignments}
            </ul>
        )
    }
}

export default Assignments
