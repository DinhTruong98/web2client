import React, { Component } from 'react'
import { Button, Form, Col } from 'react-bootstrap';
import Axios from 'axios';
import { distance } from './helper'

export default class bookingPanel extends Component {

  state = {
    startLat: 0,
    startLng: 0,
    finishLat: 0,
    finishLng: 0,
    phoneNumber: 0,
    distantBetween2Point: 0,
    componentStatus: {
      isHideBookingPanel: false,
      isHideBookingProgess: true,
      inputStartLocationFromStatus: 'false',
      inputFinishLocationFromStatus: 'false',
      inputPhoneNumberFromStatus: 'false',
      isHideCancelButton: false,
      isHideDriverInfoPanel: true,
      isHideBookingFinishPanel: true,
      isHideOKButton: true
    },
    bookingInfo: {
      id: 0,
      name: '',
      avatarLink: '',
      vehicleBrand: '',
      vehicleId: '',
      distant: ''
    }
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.saveCurrentPosition);
    }
    else console.log('Không thể lấy vị trí, vui lòng tự chọn bằng tay')
  }

  componentDidMount() {
    this.getLocation()
    setInterval(() => {
      // Cap nhat khoang cach giua 2 diem ma khach dat(don vi km)
      let kc = Math.round(distance(this.state.startLat, this.state.startLng, this.state.finishLat, this.state.finishLng) * 10) / 10
      this.setState({
        distantBetween2Point: kc
      })

      //Kiem tra xem don dat xe cua minh da co nguoi nhan chua, neu da co nguoi nhan thi hien thi ten nguoi nhan
      Axios.get('http://localhost:8797/check_my_booking_status/' + this.state.phoneNumber + '/' + this.state.bookingInfo.id).then(result => {
        if (!result.data.loi) {
          this.setState({
            bookingInfo: result.data,
            componentStatus: {
              isHideBookingPanel: true,
              isHideBookingProgess: false,
              inputStartLocationFromStatus: 'false',
              inputFinishLocationFromStatus: 'false',
              inputPhoneNumberFromStatus: 'false',
              isHideCancelButton: true,
              isHideDriverInfoPanel: false,
              isHideBookingFinishPanel: true
            },
          })
        }
        if (result.data.finish) {
          window.location = 'http://localhost:3000'
          this.setState({
            isHideBookingFinishPanel: false,
            
          })
        }
        console.log(result.data)
      })
    }, 1500)
  }

  saveCurrentPosition = (position) => {
    localStorage.setItem('currentLat', position.coords.latitude)
    localStorage.setItem('currentLng', position.coords.longitude)
  }

  saveStartLocation = (e) => {
    let startLat = localStorage.getItem('currentLat')
    let startLng = localStorage.getItem('currentLng')

    this.setState({
      startLat: startLat,
      startLng: startLng,
    })

  }

  saveFinishLocation = () => {
    let finishLat = localStorage.getItem('currentLat')
    let finishLng = localStorage.getItem('currentLng')
    this.setState({
      finishLat: finishLat,
      finishLng: finishLng,
    })
  }

  /* -------------------------------------------------------- */
  getStartLocation = (e) => {
    //console.log(e.target.value)
  }

  getFinishLocation = (e) => {
    //console.log(e.target.value)
  }

  getPhoneNumber = (e) => {
    this.setState({
      phoneNumber: e.target.value
    })
  }

  book = () => {
    if (this.state.phoneNumber === 0 || this.state.startLat === 0 || this.state.finishLat === 0) {
      alert('Vui lòng nhập đầy đủ thông tin')
    } else {
      let data = {
        startLat: this.state.startLat,
        startLng: this.state.startLng,
        finishLat: this.state.finishLat,
        finishLng: this.state.finishLng,
        phoneNumber: this.state.phoneNumber,
        distantBetween2point: this.state.distantBetween2Point
      }
      Axios.post('http://localhost:8797/booking', data)
      this.setState({
        componentStatus: {
          isHideBookingPanel: true,
          isHideBookingProgess: false,
          isHideBookingFinishPanel: true
        }
      })
      console.log('Sau khi click Book' + this.state)
    }
  }

  cancel = () => {
    this.setState({
      componentStatus: {
        isHideBookingPanel: false,
        isHideBookingProgess: true,
      }
    })
    console.log('Sau khi click Cacel' + this.state)
  }

  end = () => {
    window.location = 'http://localhost:3000'
  }

  render() {

    return (
      <div>
        <div className='booking-finish-panel' hidden={this.state.componentStatus.isHideBookingFinishPanel}>
          <br />
          <h3 hidden="">Chuyến đi đã kết thúc</h3>
          <p>Mã chuyến đi:{this.state.bookingInfo.id}</p>
          <div hidden={this.state.componentStatus.isHideDriverInfoPanel}>
            <p>Giá: {Math.round(this.state.distantBetween2Point * 10) / 10 * 2000}d (cho {Math.round(this.state.distantBetween2Point * 10) / 10} km)</p>
          </div>

          <input type='button' onClick={this.end} className="form-button-submit" value="Xác nhận" />
        </div>


        <div className="mobile-booking-panel">
          <h6>Click vào nơi cần chọn trên map, sau đó chọn các  thao tác bên dưới</h6>< br />
          <Form>
            <Form.Row>
              <Col>
                <Form.Control required placeholder="Nơi bắt xe" value={this.state.startLat + " " + this.state.startLng} />
                <Button onClick={this.saveStartLocation}>Chọn làm nơi xe</Button>
              </Col>
              <Col>
                <Form.Control required placeholder="Nơi cần đến" value={this.state.finishLat + " " + this.state.finishLng} />
                <Button onClick={this.saveFinishLocation}>Chọn làm nơi đến</Button>
              </Col>
              <Col>
                <Form.Control required placeholder={'Số điện thoại'} />
              </Col>
              <Col>
                <Button>Đặt xe ngay</Button>
              </Col>
            </Form.Row>
          </Form>;
        </div>


        <div className="pc-booking-panel" hidden={this.state.componentStatus.isHideBookingPanel}>
          <br />
          <h3>Đặt xe</h3>
          <p>Click vào bản đồ để chọn 1 địa điểm</p>
          <form>
            <input onChange={this.getStartLocation} value={'Tọa độ: ' + this.state.startLat + ';' + this.state.startLng} className='form-input' type='text' required placeholder="Chọn nơi bắt xe" />
            <input type="button" className='form-button' value="Chọn là nơi đi" onClick={this.saveStartLocation} />
            <label><i><quote>*Click để chọn 1 địa điểm trên bản đồ sau đó nhấn nút 'Chọn là nơi đi' để chọn điểm đó là nơi để chờ xe</quote></i></label>
            <hr />
            <input onChange={this.getFinishLocation} value={'Tọa độ: ' + this.state.finishLat + ";" + this.state.finishLng} className='form-input' type='text' required placeholder="Chọn nơi đến" />
            <input type="button" className='form-button' value="Chọn là nơi đến" onClick={this.saveFinishLocation} />
            <label><i><quote>*Click để chọn 1 địa điểm trên bản đồ sau đó nhấn nút 'Chọn là nơi đến' để chọn điểm đó là nơi cần đến</quote></i></label>
            <hr />
            <input onChange={this.getPhoneNumber} className='form-input-phonenumber' type='number' required placeholder="Nhập số điện thoại liên hệ" />
            <label><i><quote>*Vui lòng nhập chính xác số  điện thoại, bởi vì tài xế sẽ liên hệ bạn qua số  điện thoại đó</quote></i></label>
            <hr />
            <input type='button' onClick={this.book} className="form-button-submit" value="Xác nhận" />
          </form>
        </div>

        <div className='booking-progress-panel' hidden={this.state.componentStatus.isHideBookingProgess}>
          <br />
          <h3 hidden="">Chuyến đi của bạn</h3>
          <div hidden={this.state.componentStatus.isHideDriverInfoPanel}>
            <img className="driver-avatar-img" src={this.state.bookingInfo.avatarLink} /> <hr />
            <p>Mã chuyến đi:{this.state.bookingInfo.id}</p>
            <p hidden={this.state.componentStatus.isHideDriverInfoPanel}>Tên tài xế: {this.state.bookingInfo.name || 'Đang tìm kiếm tài xế'}</p>
            <p hidden={this.state.componentStatus.isHideDriverInfoPanel}>Chạy xe: {this.state.bookingInfo.vehicleBrand || '...'}</p>
            <p hidden={this.state.componentStatus.isHideDriverInfoPanel}>Có biển kiểm soát: {this.state.bookingInfo.vehicleId || '...'}</p>
            <p>Từ: {this.state.startLat + ';' + this.state.startLng}</p>
            <p>Đến: {this.state.finishLat + ';' + this.state.finishLng}</p>
            <p>Giá: {Math.round(this.state.distantBetween2Point * 10) / 10 * 2000}d (cho {Math.round(this.state.distantBetween2Point * 10) / 10} km)</p>
          </div>
          <input type='button' onClick={this.book} className="form-button-submit" value="Hủy" onClick={this.cancel} hidden={this.state.componentStatus.isHideCancelButton} />
        </div>
      </div>
    )
  }
}
