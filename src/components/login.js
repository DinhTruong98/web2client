import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import './style.css'
import {SendLoginToServer} from './helper'

export default class login extends Component {
    state ={
        username:"",
        password:""
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

    Login = ()=>{
        let info = this.state
        SendLoginToServer(info)
    }

    render() {
        return (
            <div className="login">
                <h3>Đăng nhập</h3>
                <form className="myForm">
                    <label>Tên đăng nhập:</label><br />
                    <input type="text" onChange={this.inputUserName} name="username"></input><br /><br />

                    <label>Mật khẩu:</label><br />
                    <input type="password" onChange={this.inputPassword} name="password"></input><br /><br />

                    <Button onClick={this.Login}> Đăng nhập </Button> <hr />
                    <span><a href="/register">Quên mật khẩu?</a></span> <br />
                    <span>Muốn trở thành tài xế? <a href="/register">Đăng kí</a> ngay!</span>
                </form>
            </div>
        )
    }
}
