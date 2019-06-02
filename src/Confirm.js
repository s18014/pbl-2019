import React, { Component } from 'react'
import './css/confirm.css'

export default class Confirm extends Component {
  constructor (props) {
    super(props)
    this.state = this.props.location.state
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
    const img = this.createPreview()
    console.log(this.state)
    return (
      <div className='form'>
        <h1>投稿</h1>
        <div className='confirm'>
          <p>以下の内容でよろしいでしょうか？</p>
          <div className='confirm-container'>
            { img }
            { JSON.stringify(this.state)}
          </div>
        </div>
      </div>
    )
  }
}
