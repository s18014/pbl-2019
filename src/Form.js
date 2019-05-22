import React, { Component } from 'react'
const request = require('superagent')

export default class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      status: '',
      msg: '',
      imgUrl: null,
      imgFile: null
    }
  }

  handleChangeFile (e) {
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
    this.setState({ msg: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    if (!this.state.imgFile || !this.state.msg) return this.setState({ state: '*必須項目を埋めてください*' })
    request
      .post('/api/upload')
      .field('msg', this.state.msg)
      .attach('aImage', this.state.imgFile)
      .end((err, res) => {
        if (err) return console.error(err)
        console.log(res)
        this.setState({ state: '投稿しました' })
      })
  }

  render () {
    const imgSelected = this.state.imgUrl === null ? null : <img src={this.state.imgUrl} height='300px' />
    return (
      <div>
        <h1>投稿</h1>
        <p>{this.state.state}</p>
        <form method='POST' action='/api/upload' encType='multipart/form-data' >
          <p><input type='file' name='aImage' onChange={e => this.handleChangeFile(e)} />*必須</p>
          <p><input type='text' name='msg' placeholder='メッセージ' value={this.state.msg} onChange={e => this.handleChangeText(e)} />*必須</p>
          <p><button onClick={e => this.handleSubmit(e)}>投稿</button></p>
        </form>

        <figure>{imgSelected}</figure>
      </div>
    )
  }
}
