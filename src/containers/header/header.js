import React, { Component } from 'react'
import { Navbar, Nav, Form, Button } from 'react-bootstrap'
import { IoIosCar } from "react-icons/io";
import Axios from 'axios'

export default class header extends Component {
    state = {
        isHideLoginButt: false,
        isHideRegisterButt: false,
        isHideLogoutButt: true,
        isHideUserInfo: true,
        username: ""
    }

    user = JSON.parse(localStorage.getItem('user')) || '';

    logout = () => {
        Axios.post('http://localhost:8797/logout', this.user).then(result => {
        })
        localStorage.removeItem('user');
        this.user = ''
        this.setState({
            isHideLoginButt: false,
            isHideRegisterButt: false,
            isHideLogoutButt: true,
            isHideUserInfo: true,
            username: ""
        })

    }

    componentWillMount() {
        if (this.user !== '') {
            this.setState({
                isHideLoginButt: true,
                isHideRegisterButt: true,
                isHideLogoutButt: false,
                isHideUserInfo: false,
                username: this.user.username
            })
        }
    }



    render() {
        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="/"><IoIosCar size={32} /> Xeeee &Omega; </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Trang chủ</Nav.Link>
                        <Nav.Link href="/partner">Đối tác</Nav.Link>
                        <Nav.Link href="/about">Về chúng tôi</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Button hidden={this.state.isHideRegisterButt}>Trở thành tài xế</Button> &nbsp;
                        <a href="/login"><Button hidden={this.state.isHideLoginButt} variant="outline-light">Đăng nhập</Button></a>
                        <Button hidden={this.state.isHideUserInfo}>{this.user.username}</Button> &nbsp;
                        <a href="/"><Button onClick={this.logout} hidden={this.state.isHideLogoutButt} variant="outline-light">Đăng xuất</Button></a>
                    </Form>
                </Navbar>
                <br />
            </div>
        )
    }
}
