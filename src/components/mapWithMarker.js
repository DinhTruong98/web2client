import React, { createRef, Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Container } from 'react-bootstrap'

export default class mapWithMarker extends Component {

    state = {
        info: JSON.parse(localStorage.getItem('drivermap')),
        zoom: 18,
    }

    showInfo = () => {
        console.log(this.state)
    }

    render() {
        const driverPosition = [10.7592763,106.6748487]
        // const startPosition = [this.state.info.startLat, this.state.info.startLng]
        // const finishPosition = [this.state.info.finishLat, this.state.info.finishLng]

        return (
            <div>
                <div hidden={this.props.hidden} >
                    <Container>
                        <Map className="map"
                            center={driverPosition}
                            zoom={this.state.zoom} >
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {/* <Marker position={driverPosition}>
                                <Popup>
                                    Bạn đang ở đây <br />
                                </Popup>
                            </Marker>

                            <Marker position={startPosition}>
                                <Popup>
                                    Đón khách ở đây<br />
                                </Popup>
                            </Marker>

                            <Marker position={finishPosition}>
                                <Popup>
                                    Đích đến<br />
                                </Popup>
                            </Marker> */}

                        </Map>

                    </Container>

                </div>
            </div>
        )
    }
}
