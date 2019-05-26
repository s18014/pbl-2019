import React, { Component } from 'react'

export default class ConfirmWhatToTask extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imageFile: this.props.imageFile,
      imgUrl: this.props.imgUrl,
      taskMsg: this.props.taskMsg,
      locationMsg: this.props.locationMsg,
      location: this.props.location
    }
  }

  createPreview () {
    if (this.state.imgUrl) {
      return (
        <figure><img src={this.state.imgUrl} id='task-id' width='300px' /></figure>
      )
    }
    return null
  }

  render () {
    return (
      <div>
          hi
      </div>
    )
  }
}
