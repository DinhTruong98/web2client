import React, { Component } from 'react'

export default class driverSummary extends Component {
    state = {
        asd: JSON.parse(localStorage.getItem('asd')),
        wsd: JSON.parse(localStorage.getItem('wsd')),
    }
    render() {
        return (
            <div hidden={true}>
                <h3>Thống kê theo tài xế</h3>
                <h4>Trong tuần qua</h4>
                Số lượng chuyến đã thực hiện thành công: {this.state.wsd.finishBooking || '...'}<br />
                Số lượng chuyến bị huỷ: {this.state.wsd.cancelBooking}<br />
                Tổng quãng đường duy chuyển: {this.state.wsd.price / 2000 || '...'} km<br />
                Tổng số tiền: {this.state.wsd.price || '...'}<br />
                <hr />
            </div>
        )
    }
}
