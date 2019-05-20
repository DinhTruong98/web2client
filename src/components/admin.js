import React, { Component } from 'react'
import { IsLoggedIn, CheckRole, GetAllUser } from './helper'
import PendingList from './pending'
import ActiveList from './activeList'
import Axios from 'axios'
import {Button} from 'react-bootstrap'


export default class admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pendingUserList: [],
            activeUserList:[],
            isHidePendingList: false,
            isHideActiveList: true
        }
    }

    //data = JSON.parse(localStorage.getItem('userList'))

    componentDidMount() {

        setInterval(()=>{

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
        }, 1500)
    }

    PendingToggle = ()=>{
        if(this.state.isHidePendingList == false)
        {
            this.setState({
            isHidePendingList: true,
            isHideActiveList: false,
            })
        }else {
            this.setState({
                isHidePendingList: false,
                isHideActiveList: true,
            })
        }
        //console.log(this.state)
    }

    ActiveToggle = ()=>{
        if(this.state.isHideActiveList == false)
        {
            this.setState({
            isHideActiveList: true,
            isHidePendingList: false
            })
        }else {
            this.setState({
                isHideActiveList: false,
                isHidePendingList: true
            })
        }
        //console.log(this.state)
    }

    render() {
        if (IsLoggedIn() === false || CheckRole() !== "admin") {
            return (<div>Bạn không có quyền truy cập trang này</div>)
        }
        else return (
            <div>
                <Button onClick={this.PendingToggle}>Danh sách chờ duyệt</Button>&nbsp;<Button onClick={this.ActiveToggle}>Quản lí tài xế</Button>&nbsp;<Button>Thống kê</Button>
                <hr />
                <div hidden={this.state.isHidePendingList}>
                    <PendingList list = {this.state.pendingUserList}/>
                </div>
                <div hidden={this.state.isHideActiveList}>
                    <ActiveList list = {this.state.activeUserList}/>
                </div>
                
            <br />
            </div>
        )
    }
}
