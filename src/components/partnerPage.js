import React, { Component } from 'react'
import './style.css'
import { CheckRole } from './helper'
import ActivePartnerPage from './activePartnerPage'

export default class partnerPage extends Component {

  user = JSON.parse(localStorage.getItem('user'))

  render() {
    if (this.user && CheckRole() == "active") {
      return (
        <div>Xin chào {this.user.username}
          <ActivePartnerPage />
        </div>
      )
    }

    if (this.user && CheckRole() == "pending") {
      return (
        <div>
          <h3>Toàn khoản của bạn đang được xét duyệt hoặc đã bị khóa, liên hệ quản trị viên để biết thêm chi tiết</h3>
        </div>
      )
    }

    else {
      return (
        <div>Đây là trang giới thiệu về chương trình đối tác cho những người chưa đăng nhập</div>
      )
    }
  }
}
