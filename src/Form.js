import React, { Component } from 'react'
import GetGeolocation from './GetGeolocation'
const request = require('superagent')

export default class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      status: '',
      taskMsg: '',
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
    request
      .post('/api/upload')
      .field('msg', this.state.taskMsg)
      .attach('aImage', this.state.imgFile)
      .end((err, res) => {
        if (err) return console.error(err)
        console.log(res)
        this.setState({ state: '投稿しました' })
      })
  }

  getLocation (e) {
    console.log(e)
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
    const imgPicked = this.createPreview()
    const taskPlaceholder = '例: 道路に木が倒れていて危険な状態です。'
    console.log(this.img)
    return (
      <div>
        <h1>投稿</h1>
        <form>
          <p><input type='file' name='aImage'
            onChange={e => this.handleChangeImgFile(e)}
          /></p>
          <p><textarea type='text' name='taskMsg'
            placeholder={taskPlaceholder} value={this.state.msg} onChange={e => this.handleChangeText(e)}
          /></p>
          <p><button onClick={e => this.handleSubmit(e)}>投稿</button></p>
          <GetGeolocation onClick={e => this.getLocation(e)} imageID={'task-id'} />
        </form>

        {imgPicked}
      </div>
    )
  }
}
