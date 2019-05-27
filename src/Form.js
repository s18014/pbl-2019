import React, { Component } from 'react'
import GetGeolocation from './GetGeolocation'
import LeafMap from './LeafMap'
const request = require('superagent')

export default class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      status: '',
      taskMsg: '',
      locationMsg: '',
      location: null,
      imgUrl: null,
      imgFile: null
    }
  }

  handleChangeImgFile (e) {
    const URL = (window.URL || window.webkitURL)
    const createObjectURL = URL.createObjectURL
    const files = e.target.files
    const url = files.length === 0 ? null : createObjectURL(files[0])
    URL.revokeObjectURL(createObjectURL)
    this.setState({
      imgUrl: url,
      imgFile: files[0]
    })
  }

  handleChangeText (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit (e) {
    const location = this.state.location ? JSON.stringify(this.state.location) : ''
    e.preventDefault()
    request
      .post('/api/upload')
      .field('taskMsg', this.state.taskMsg)
      .field('locationMsg', this.state.locationMsg)
      .field('location', location)
      .attach('aImage', this.state.imgFile)
      .end((err, res) => {
        if (err) return console.error(err)
        console.log(res)
        this.setState({ status: '投稿しました' })
      })
  }

  getLocation (e) {
    this.setState({
      location: {
        lat: e.lat,
        lon: e.lon
      }
    })
  }

  createPreviewImage () {
    if (this.state.imgUrl) {
      return (
        <figure><img src={this.state.imgUrl} id='task-id' width='300px' /></figure>
      )
    }
    return null
  }

  render () {
    const status = this.state.status ? <p>{this.state.status}</p> : null
    const imgPicked = this.createPreviewImage()
    const taskPlaceholder = '例: 道路に木が倒れていて危険な状態です。'
    const locationPlaceholder = '例: 那覇市樋川 ITカレッジ沖縄前の交差手点'
    return (
      <div className='form-component'>
        <h1>投稿</h1>
        {imgPicked}
        <form>
          <p><input type='file' name='aImage'
            onChange={e => this.handleChangeImgFile(e)}
          /></p>
          <p><textarea type='text' name='taskMsg'
            placeholder={taskPlaceholder} value={this.state.taskMsg} onChange={e => this.handleChangeText(e)}
          /></p>
          <p><input type='text' name='locationMsg'
            placeholder={locationPlaceholder} value={this.state.locationMsg} onChange={e => this.handleChangeText(e)}
          /></p>

          <GetGeolocation onClick={e => this.getLocation(e)} imageID={'task-id'} />
        </form>
        <LeafMap location={this.state.location} />
        <p><button onClick={e => this.handleSubmit(e)}>投稿</button></p>
        { status }

      </div>
    )
  }
}
