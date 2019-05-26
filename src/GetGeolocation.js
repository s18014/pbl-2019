import React, { Component } from 'react'
const exif = require('exif-js')

export default class GetGeolocation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      status: ''
    }
  }

  getGeolocationWithBrowser (e) {
    e.preventDefault()
    navigator.geolocation.getCurrentPosition((pos) => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      if (this.props.onClick) {
        this.props.onClick(obj)
      }
    })
  }

  getGeolocationWithImage (e) {
    e.preventDefault()
    const img = document.getElementById(this.props.imageID)
    if (!img) {
      this.setState({
        status: '画像がありません'
      })
      return null
    }
    exif.getData(img, () => {
      console.log(exif.getAllTags(this))
      this.setState({
        status: 'この機能は未実装です'
      })
    })
  }

  render () {
    return (
      <div className='get-geolocation-component'>
        <p>{this.state.status}</p>
        <p>位置情報を取得する</p>
        <button onClick={e => this.getGeolocationWithBrowser(e)}>端末から取得</button>
        <button onClick={e => this.getGeolocationWithImage(e)}>画像から取得</button>
      </div>
    )
  }
}
