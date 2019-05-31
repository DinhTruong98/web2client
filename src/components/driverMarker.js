import React, { Component } from 'react'
import { Marker, Popup } from 'react-leaflet'


export default class driverMarker extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        driverList: []
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                driverList: this.props.driverList
            })
        }, 500)
    }

    render() {
        let position = [this.state.driverList.currentLat, this.state.driverList.currentLng]
        console.log(position)
        if (this.state.driverList == null) return (<div></div>)
        else {
            return this.state.driverList.map(d => 
            <Marker position={position}>
            </Marker>)
        }
    }
}
