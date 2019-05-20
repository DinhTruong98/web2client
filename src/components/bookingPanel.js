import React, { Component } from 'react'
import { Button, Form, Col } from 'react-bootstrap';

export default class bookingPanel extends Component {

  state = {
    startLat : 0,
    startLng : 0,
    finishLat : 0,
    finishLng : 0
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

  saveStartLocation = () => {
    let startLat = localStorage.getItem('currentLat')
    let startLng = localStorage.getItem('currentLng')
    this.setState({
      startLat : startLat,
      startLng : startLng,
    })

  }

  saveFinishLocation = () => {
    let finishLat = localStorage.getItem('currentLat')
    let finishLng = localStorage.getItem('currentLng')
    this.setState({
      finishLat : finishLat,
      finishLng : finishLng,
    })
  }

  render() {

    return (
      <div>
        <Button onClick={this.getLocation}>(o)</Button>  
        <Form>
          <Form.Row>
            <Col>
              <Form.Control required placeholder="Nơi bắt xe" value={this.state.startLat + " " + this.state.startLng} />
              <Button onClick={this.saveStartLocation}>Lưu địa điểm bắt xe</Button>
            </Col>
            <Col>
              <Form.Control required placeholder="Nơi cần đến" value={this.state.finishLat + " " + this.state.finishLng} />
               <Button onClick={this.saveFinishLocation}>Lưu địa điểm cần đến</Button>
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
    )
  }
}
