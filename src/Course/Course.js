import React, {Component} from 'react'
import {Card, CardHeader, CardTitle} from 'material-ui/Card'

class Course extends Component {
  render() {
    return (<Card>
      <CardHeader
        title={this.props.name}
        subtitle={this.props.name.split(' ')[0] || undefined}
        avatar="img/swimmingfish.jpeg"
      />
      <CardTitle title={this.props.name} subtitle={this.props.name} />
    </Card>
    )
  }
}

export default Course
