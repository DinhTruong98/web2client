import React, { Component } from 'react'
import Axios from 'axios'
import { Button } from 'react-bootstrap'
import MapWithMarker from './mapWithMarker'
import mapWithMarker from './mapWithMarker';

export default class activePartnerPage extends Component {

    user = JSON.parse(localStorage.getItem('user'))

    state = {
        isHideAcceptPanel: true,
        location: {
            driverLat: '',
            driverLng: '',
            customerLat: '',
            customerLng: '',
            distant: ''
        },
        customerPhoneNumber: '',
        bookingInfo: [],
        isHideDrivingPanel: true,
        isHideDriverMap: true,
        info: {},
        isHideDrivingList: true
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.saveCurrentPosition);
        }
        else console.log('Không thể lấy vị trí, vui lòng tự chọn bằng tay')
    }

    saveCurrentPosition = (position) => {
        let user = JSON.parse(localStorage.getItem('user'))
        let username = user.username
        let lat = position.coords.latitude
        let lng = position.coords.longitude

        this.setState({
            location: {
                driverLat: lat,
                driverLng: lng
            }
        })

        Axios.put('http://localhost:8797/update_driver_location', { lat, lng, username }).then(result => {

        })
    }

    componentDidMount() {
        let username = this.user.username

        //get lien tuc de nhan su thay doi tu server, neu co khach thi hien bang chap nhan khach hang. 
        //bang nay hoen thi thong tin khach hang va so dien thoai cua khach.
        setInterval(() => {
            Axios.get('http://localhost:8797/checking_for_customer/' + username).then(result => {
                if (!result.data.err) {
                    this.setState({
                        bookingInfo: result.data[0],
                        isHideAcceptPanel: false,
                    })
                    let a = {
                        curDriverLat: this.state.location.driverLat,
                        curDriverLng: this.state.location,
                        startLat: this.state.bookingInfo.bookerStartLat,
                        startLng: this.state.bookingInfo.bookerStartLng,
                        finishLat: this.state.bookingInfo.bookerFinishLat,
                        finishLng: this.state.bookingInfo.bookerFinishLng
                    }
                    localStorage.setItem('drivermap', JSON.stringify(a))
                } else {
                    this.setState({
                        isHideAcceptPanel: true
                    })
                }
            })
            console.log(this.state)
        }, 1500);
    }

    cancel = () => {
        let username = this.user.username

        this.setState({
            isHideAcceptPanel: true
        })
        Axios.put('http://localhost:8797/checking_for_customer/' + username + '/cancel').then((err, result) => {

        })
    }

    accept = () => {
        let username = this.user.username

        this.setState({
            isHideAcceptPanel: true,
            isHideDrivingPanel: false,
            isHideDriverMap: false,
            isHideDrivingList: false
        })

        Axios.put('http://localhost:8797/checking_for_customer/' + username + '/accept').then((err, result) => {
        })
    }

    finish = () => {
        let username = this.user.username

        Axios.put('http://localhost:8797/checking_for_customer/' + username + '/finish').then((err, result) => {
        })
        this.setState({
            isHideAcceptPanel: true,
            isHideDrivingPanel: false,
            isHideDriverMap: false,
            isHideDrivingList: true
        })
    }

    break = () => {
        let username = this.user.username

        Axios.put('http://localhost:8797/checking_for_customer/' + username + '/cancel').then((err, result) => {

        })
        this.setState({
            isHideAcceptPanel: true,
            isHideDrivingPanel: false,
            isHideDriverMap: false,
            isHideDrivingList: true
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.getLocation}>Gui toa do len server</button>
                <div className="driving-list" hidden={this.state.isHideDrivingList}>
                    <br />
                    <h3>Thông tin chuyến đi</h3><hr />
                    Số điện thoại: {this.state.bookingInfo.bookerPhoneNumber}<br /><br />
                    Khoảng cách: {this.state.bookingInfo.distantBetween2point}<br /><br />
                    Số tiền: {this.state.bookingInfo.price}<br /><br />
                    <button onClick={this.finish}>Kết thúc chuyến</button>
                    <button onclick={this.break}>Huỷ chuyến</button>


                </div>
                <div className="accept-panel" hidden={this.state.isHideAcceptPanel} info={this.state.info}>
                    <br />
                    <h3>Bạn có 1 cuộc đặt xe mới</h3><hr />
                    <h5>Số điện thoại liên hệ: <i>{this.state.bookingInfo.bookerPhoneNumber}</i> </h5><hr />
                    <h5>Từ: {this.state.bookingInfo.bookerStartLat};{this.state.bookingInfo.bookerStartLng}</h5><hr />
                    <h5>Đến: {this.state.bookingInfo.bookerFinishLat};{this.state.bookingInfo.bookerFinishLng}</h5><hr />
                    <h5>Quãng đường di chuyển: {this.state.bookingInfo.distantBetween2point} km</h5><hr />
                    <h5>Giá tiền: <i>{this.state.bookingInfo.price} đồng</i> </h5>
                    <hr />
                    <Button variant="danger" onClick={this.cancel}>Huỷ</Button>
                    <Button variant="success" onClick={this.accept}>Đồng ý nhận khách</Button>
                </div>
            </div>
        )
    }
}
