import React, { Component } from 'react'
import { Button, Form, Col } from 'react-bootstrap';
import Axios from 'axios';

export default class bookingPanel extends Component {

  state = {
    startLat: 0,
    startLng: 0,
    finishLat: 0,
    finishLng: 0,
    phoneNumber: 0,
    componentStatus: {
      isHideBookingPanel: false,
      isHideBookingProgess: true,
      inputStartLocationFromStatus: 'false',
      inputFinishLocationFromStatus: 'false',
      inputPhoneNumberFromStatus: 'false',
    }
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.saveCurrentPosition);
    }
    else console.log('Không thể lấy vị trí, vui lòng tự chọn bằng tay')
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
      Axios.post('http://localhost:8797/booking', this.state)
      this.setState({
        componentStatus: {
          isHideBookingPanel: true,
          isHideBookingProgess: false
        }
      })
      console.log('Sau khi click Book' + this.state)
    }
  }

  cancel = () => {
    this.setState({
      componentStatus: {
        isHideBookingPanel: false,
        isHideBookingProgess: true
      }
    })
    console.log('Sau khi click Cacel' + this.state)
  }

  render() {

    return (
      <div>
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
          <h3>Đang tìm tài xế gần đây nhất</h3>
          <div class="lds-dual-ring"></div>
          <input type='button' onClick={this.book} className="form-button-submit" value="Hủy" onClick={this.cancel} />
        </div>
      </div>
    )
  }
}
