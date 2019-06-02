import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Leaflet from 'leaflet'

import GetGeolocation from './GetGeolocation'
import LeafMap from './LeafMap'
import './css/leaflet.css'
import './css/form.css'

const request = require('superagent')

Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/'

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
    e.preventDefault()
    const location = this.state.location ? JSON.stringify(this.state.location) : ''
    request
      .post('/api/upload')
      .field('taskMsg', this.state.taskMsg)
      .field('locationMsg', this.state.locationMsg)
      .field('location', location)
      .attach('aImage', this.state.imgFile)
      .end((err, res) => {
        if (err) return console.error(err)
        this.setState({
          jump: '/form/confirm'
        })
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
        <figure><img src={this.state.imgUrl} id='task-id' /></figure>
      )
    }
    return null
  }

  createInputBoxes () {
    const imageField = this.createImageField()
    const taskField = this.createTaskField()
    const placeField = this.createPlaceField()
    const locationField = this.createLocationField()
    return (
      <div className='input-boxes'>
        { imageField }
        { taskField }
        { placeField }
        { locationField }
      </div>
    )
  }

  createTaskField () {
    const taskPlaceholder = '問題の詳細を記入してください'
    return (
      <div className='input-box'>
        <div className='title'>
          <p>問題の詳細</p>
          <p className='require'>*必須</p>
        </div>

        <div className='input-area'>
          <textarea type='text' name='taskMsg'
            placeholder={taskPlaceholder} value={this.state.taskMsg} onChange={e => this.handleChangeText(e)}
          />
        </div>
      </div>
    )
  }

  createPlaceField () {
    const PlacePlaceholder = '場所の詳細を記入してください'
    return (
      <div className='input-box'>
        <div className='title'>
          <p>場所の詳細</p>
          <p className='require'>*必須</p>
        </div>

        <div className='input-area'>
          <textarea type='text' name='locationMsg'
            placeholder={PlacePlaceholder} value={this.state.locationMsg} onChange={e => this.handleChangeText(e)}
          />
        </div>
      </div>
    )
  }

  createImageField () {
    const imgPicked = this.createPreviewImage()
    return (
      <div className='input-box'>
        <div className='title'>
          <p>画像</p>
          <p className='require'>*必須</p>
        </div>

        <div className='input-area'>
          <div className='input-button'>
            <label>
                画像を選択
              <input type='file' name='aImage'
                onChange={e => this.handleChangeImgFile(e)}
              />
            </label>
          </div>
        </div>

        <div className='preview'>
          { imgPicked }
        </div>
      </div>
    )
  }

  createLocationField () {
    return (
      <div className='input-box'>
        <div className='title'>
          <p>位置情報</p>
          <p className='require'>*必須</p>
        </div>

        <GetGeolocation onClick={e => this.getLocation(e)} imageID={'task-id'} />

        <div className='preview'>
          <LeafMap location={this.state.location} />
        </div>
      </div>
    )
  }

  render () {
    if (this.state.jump) {
      return (
        <Redirect to={{
          pathname: this.state.jump,
          state: this.state
        }} />
      )
    }
    return (
      <div id='form-page'>
        <div className='form-container'>
          <h1>投稿</h1>

          <div className='input'>
            <div className='input-container'>
              { this.createInputBoxes() }
            </div>
          </div>

          <div className='confirm'>
            <div className='confirm-button'>
              <label>
                確認画面へ
                <button onClick={e => this.handleSubmit(e)} />
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
