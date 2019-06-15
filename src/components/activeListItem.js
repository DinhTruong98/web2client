import React, { Component } from 'react'
import {ListGroup, Button} from 'react-bootstrap'
import './style.css'
import Axios from 'axios'

export default class pendingListItem extends Component {
  constructor(props){
    super(props)
  }
  BanAUser = ()=>{
    let link = 'http://localhost:8797/ban_a_user/'+this.props.item.username
    Axios.put(link).then(result => {
      //console.log(result)
    })
    .catch(err => { throw err })
  }

  DeleteAUser = ()=> {
    let link = 'http://localhost:8797/del_a_user/'+this.props.item.username
    Axios.put(link).then(result => {
      //console.log(result)
    })
    .catch(err => { throw err })
  }

  EditAUser = ()=> {

  }


  render() {
    return (
      <div>
        <ListGroup.Item hidden={false}>{this.props.item.name}&nbsp;/&nbsp;{this.props.item.vehicleBrand}&nbsp;/&nbsp;{this.props.item.vehicleId}
          <div className="div-butt-float-right">
            <Button onClick={this.BanAUser}>Khóa</Button> -
            <Button onClick={this.DeleteAUser}>Xoá</Button> -
            <Button onClick={this.EditAUser}>Sửa</Button> 
          </div>
        </ListGroup.Item>
      </div>
    )
  }
}
