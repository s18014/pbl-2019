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
      const location = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      if (this.props.onClick) {
        this.props.onClick(location)
      }
      this.setState({
        status: '位置情報を取得しました'
      })
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
      <div className='input-area'>
        <div className='input-button'>
          {this.state.status}
          <label>
              端末から取得
            <button onClick={e => this.getGeolocationWithBrowser(e)} />
          </label>

          <label>
              画像から取得
            <button onClick={e => this.getGeolocationWithImage(e)} />
          </label>
        </div>
      </div>
    )
  }
}
