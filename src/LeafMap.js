import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

export default class LeafMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      location: this.props.location
    }
  }

  componentWillReceiveProps (props) {
    this.setState({
      location: props.location
    })
  }

  createMap () {
    if (!this.state.location) return null
    const url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    const attribution = '<a href="http://osm.org/copyright">OpenStreetMap</a>'
    const position = this.state.location
    return (
      <Map center={position} zoom={15}>
        <TileLayer
          attribution={attribution}
          url={url}
        />
        <Marker position={position}>
          <Popup>
            <h2>現場</h2>
          </Popup>
        </Marker>
      </Map>
    )
  }

  render () {
    const map = this.createMap()
    return (
      <div className='leafmap-component'>
        {map}
      </div>
    )
  }
}
