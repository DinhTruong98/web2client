import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import './style.css'
import {SendRegisterToServer} from './helper'

export default class register extends Component {
    state = {
        name:"",
        username:"",
        avatarLink:"",
        password:"",
        password_confirm:"",
        vehicleImageLink:"",
        vehicleBrand:"",
        vehicleId:""
    }

    inputName = (e) =>{
        this.setState({
            name:e.target.value
        })
    }

    inputAvatarLink = (e) =>{
        this.setState({
            avatarLink:e.target.value
        })
    }

    inputUserName = (e) =>{
        this.setState({
            username:e.target.value
        })
    }

    inputPassword = (e) =>{
        this.setState({
            password:e.target.value
        })
    }

    inputPasswordConfirm = (e) =>{
        this.setState({
            password_confirm:e.target.value
        })
    }

    inputVehicleImageLink = (e) =>{
        this.setState({
            vehicleImageLink:e.target.value
        })
    }

    inputVehicleBrand = (e) =>{
        this.setState({
            vehicleBrand:e.target.value
        })
    }

    inputVehicleId = (e) =>{
        this.setState({
            vehicleId:e.target.value
        })
    }

    register = ()=>{
        let info = this.state;
        SendRegisterToServer(info);
    }

    render() {
        return (
            <div>
                <h3>Đăng kí</h3>
                <form className="myForm">

                    <label>Họ và tên:</label><br />
                    <input type="text" onChange={this.inputName} name="name"></input><br /><br />

                    <label>Link ảnh đại diện:</label><br />
                    <input type="text" onChange={this.inputAvatarLink} name="avatarLink"></input><br /><br />

                    <label>Tên đăng nhập:</label><br />
                    <input type="text" onChange={this.inputUserName} name="username"></input><br /><br />

                    <label>Mật khẩu:</label><br />
                    <input type="password" onChange={this.inputPassword} name="password"></input><br /><br />

                    <label>Nhập lại mật khẩu:</label><br />
                    <input type="password" onChange={this.inputPasswordConfirm} name="password_confirm"></input><br /><br />

                    <label>Link ảnh xe:</label><br />
                    <input type="text" onChange={this.inputVehicleImageLink} name="vehicleImageLink"></input><br /><br />

                    <label>Hãng xe:</label><br />
                    <input type="text" onChange={this.inputVehicleBrand} name="vehicleBrand"></input><br /><br />

                    <label>Biển kiểm soát:</label><br />
                    <input type="text" onChange={this.inputVehicleId} name="vehicleId"></input><br /><br />

                    <Button onClick={this.register}> Đăng kí </Button> <hr />
                    <span>Đã có tài khoản? <a href="/login">Đăng nhập</a> ngay!</span>
                </form>
            </div>
        )
    }
}
