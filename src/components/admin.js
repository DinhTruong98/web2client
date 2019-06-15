import React, { Component } from 'react'
import { IsLoggedIn, CheckRole, GetAllUser } from './helper'
import PendingList from './pending'
import ActiveList from './activeList'
import Axios from 'axios'
import { Button } from 'react-bootstrap'
import DriverSummary from './driverSummary'


export default class admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            driverName: '',
            isHideDriverSummaryComp: true,
            isHideAllSummary: false,
            isHideDriverSummary: true,
            pendingUserList: [],
            activeUserList: [],
            isHidePendingList: false,
            isHideActiveList: true,
            isHideSummary: true,
            summary: {
                weekly: {
                    "finishBooking": 0,
                    "cancelBooking": 0,
                    "price": 0
                },
                monthly: {
                    "finishBooking": 0,
                    "cancelBooking": 0,
                    "price": 0
                },
                daily: {
                    "finishBooking": 0,
                    "cancelBooking": 0,
                    "price": 0
                },
                all: {
                    "finishBooking": 0,
                    "cancelBooking": 0,
                    "price": 0
                }
            }
        }
    }

    //data = JSON.parse(localStorage.getItem('userList'))

    componentDidMount() {

        setInterval(() => {

            Axios.get('http://localhost:8797/pending_user').then(result => {
                this.setState({
                    pendingUserList: result.data.userList
                })
            }).catch(err => { throw err })

            Axios.get('http://localhost:8797/active_user').then(result => {
                this.setState({
                    activeUserList: result.data.userList
                })
                //console.log(this.state)
            }).catch(err => { throw err })

            // lay thong tin ve thong ke


            Axios.get('http://localhost:8797/all_summary_all').then(r => {
                this.setState({
                    summary: {
                        all: r.data
                    }
                })
            })



            // Axios.get('http://localhost:8797/monthly_summary_all').then(r => {
            //     this.setState({
            //         summary:{
            //             monthly:r.data
            //         }
            //     })
            // })
        }, 1500)
        console.log(this.state.summary)
    }

    PendingToggle = () => {
        if (this.state.isHidePendingList == false) {
            this.setState({
                isHidePendingList: true,
                isHideActiveList: false,
            })
        } else {
            this.setState({
                isHidePendingList: false,
                isHideActiveList: true,
            })
        }
        //console.log(this.state)
    }

    ActiveToggle = () => {
        if (this.state.isHideActiveList == false) {
            this.setState({
                isHideActiveList: true,
                isHidePendingList: false,
                isHideSummary: true
            })
        } else {
            this.setState({
                isHideActiveList: false,
                isHidePendingList: true,
                isHideSummary: true
            })
        }
        //console.log(this.state)
    }

    showSummary = () => {
        this.setState({
            isHideSummary: false,
            isHidePendingList: true,
            isHideActiveList: true
        })
    }

    getAllSummary = () => {
        this.setState({
            isHideDriverSummary: true,
            isHideAllSummary: false
        })
        Axios.get('http://localhost:8797/weekly_summary_all').then(r => {
            localStorage.setItem('wsa', JSON.stringify(r.data))
        })
        // Axios.get('http://localhost:8797/all_summary_all').then(r => {
        //     localStorage.setItem('asa',JSON.stringify(r.data))
        // })
    }
    getDriverSummary = () => {
        this.setState({
            isHideDriverSummary: false,
            isHideAllSummary: true
        })
    }

    getDriverSummaryInfo = () => {
        localStorage.setItem('asd', JSON.stringify({
            "finishBooking": 0,
            "cancelBooking": 0,
            "price": 0
        }))
        localStorage.setItem('wsd', JSON.stringify({
            "finishBooking": 0,
            "cancelBooking": 0,
            "price": 0
        }))
        Axios.get('http://localhost:8797/all_summary_driver/' + this.state.driverName).then(r => {
            localStorage.setItem('asd', JSON.stringify(r.data))
        })

        Axios.get('http://localhost:8797/weekly_summary_driver/' + this.state.driverName).then(r => {
            localStorage.setItem('wsd', JSON.stringify(r.data))
        })
        this.setState({
            isHideDriverSummaryComp: false
        })
    }

    onInputChange = (e) => {
        this.setState({
            driverName: e.target.value
        })
    }

    render() {
        let wsa = JSON.parse(localStorage.getItem('wsa'))
        if (IsLoggedIn() === false || CheckRole() !== "admin") {
            return (<div>Bạn không có quyền truy cập trang này</div>)
        }
        else return (
            <div>
                <Button onClick={this.PendingToggle}>Danh sách chờ duyệt</Button>&nbsp;<Button onClick={this.ActiveToggle}>Quản lí tài xế</Button>&nbsp;<Button onClick={this.showSummary}>Thống kê</Button>
                <hr />
                <div hidden={this.state.isHidePendingList}>
                    <PendingList list={this.state.pendingUserList} />
                </div>
                <div hidden={this.state.isHideActiveList}>
                    <ActiveList list={this.state.activeUserList} />
                </div>
                <div hidden={this.state.isHideSummary}>
                    <h3>Thống kê</h3>
                    <br />
                    <button onClick={this.getAllSummary} >Thống kê toàn hệ thống</button>
                    <button onClick={this.getDriverSummary}>Thống kê theo tài xế</button>

                    <div hidden={this.state.isHideAllSummary}><hr />
                        <h3>Thống kê theo toàn hệ thống</h3>
                        <h4>Trong tuần qua</h4>
                        Số lượng chuyến đã thực hiện thành công: {wsa.finishBooking || '...'}<br />
                        Số lượng chuyến bị huỷ: {wsa.cancelBooking}<br />
                        Tổng quãng đường duy chuyển: {wsa.price / 2000 || '...'} km<br />
                        Tổng số tiền: {wsa.price || '...'}<br />
                        <hr />
                        <h4>Tổng</h4>
                        Số lượng chuyến đã thực hiện thành công: {this.state.summary.all.finishBooking || '...'}<br />
                        Số lượng chuyến bị huỷ: {this.state.summary.all.cancelBooking}<br />
                        Tổng quãng đường duy chuyển: {this.state.summary.all.price / 2000 || '...'} km<br />
                        Tổng số tiền: {this.state.summary.all.price || '...'}<br />
                    </div>

                    <div hidden={this.state.isHideDriverSummary}><hr />
                        <h3>Thống kê theo tài xế</h3><br />
                        <form>
                            <input type="text" placeholder="Tên đăng nhập của tài xế" onChange={this.onInputChange} />
                            <input type="button" value="Kiểm tra" onClick={this.getDriverSummaryInfo} /> <hr />
                        </form>
                    </div>
                </div>

                <br />
            </div>
        )
    }
}
