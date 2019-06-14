import React, { createRef, Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Container } from 'react-bootstrap'
import BookingPanel from './bookingPanel'
//import Routing from './mapRouting'

export default class map extends Component {

    state = {
        lat: 0,
        lng: 0,
        zoom: 3,
        driverList: []
    }

    componentDidMount() {
        setInterval(() => {

            // Axios.get('http://localhost:8797/getWorkingDrivers').then(result => {
            //     this.setState({
            //         driverList: result.data.workingDrivers
            //     })
            // })
            //console.log(this.state)

            let lat = localStorage.getItem('currentLat')
            let lng = localStorage.getItem('currentLng')
            if (lat != null) {
                this.setState({
                    lat: lat,
                    lng: lng,
                    zoom: 16,
                })
            }

        }, 1000)
    }

    onMapClick = (e) => {
        localStorage.setItem('currentLat', e.latlng.lat)
        localStorage.setItem('currentLng', e.latlng.lng)
        console.log(e.latlng)
    }

    mapRef = createRef()



    render() {
        //console.log(this.a)
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


// import React, { Component } from 'react';
// import { Map, TileLayer } from 'react-leaflet';

// import { MAPBOX_URL } from 'consts';
// import Routing from './Routing';

// const position = [53.349183, 83.761164];

// class MapContainer extends Component {
//   render() {
//     return (
//       <Map center={position} zoom={5} ref={map => this.map = map}>
//         <TileLayer
//           url={MAPBOX_URL}
//         />
//         <Routing map={this.map} />
//       </Map>
//     );
//   }
// }

// MapContainer.propTypes = {};
// MapContainer.defaultProps = {};

// export default MapContainer;