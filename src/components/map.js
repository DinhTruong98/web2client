import React, {createRef, Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Container } from 'react-bootstrap'
import BookingPanel from './bookingPanel'

export default class map extends Component {

    state = {
        lat: 0,
        lng: 0,
        zoom: 3,
    }

    componentDidMount(){
        setInterval(()=>{
            let lat = localStorage.getItem('currentLat')
            let lng = localStorage.getItem('currentLng')
            if(lat != null){
                this.setState({
                    lat: lat,
                    lng: lng,
                    zoom: 18,
                })
            }
        }, 2000)
    }

    onMapClick = (e)=>{
        localStorage.setItem('currentLat',e.latlng.lat)
        localStorage.setItem('currentLng',e.latlng.lng)
        console.log(e.latlng)
    }

    mapRef = createRef()

    render() {
        const position = [this.state.lat, this.state.lng]
        return (
            <div>
                <Container>
                    <Map className="map" 
                    center={position} 
                    zoom={this.state.zoom} 
                    ref={this.mapRef} 
                    onClick={this.onMapClick}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                               Bạn đang ở vị trí này <br />
                        </Popup>
                        </Marker>
                    </Map>
                    <div className="booking-panel">
                    <BookingPanel />
                    </div>
                </Container>
            </div>

        )
    }
}
