import React, { Component } from 'react'
import {ListGroup, Button} from 'react-bootstrap'
import './style.css'
import Axios from 'axios'

export default class pendingListItem extends Component {
  constructor(props){
    super(props)
  }

  activeAPendingUser = ()=>{
    let link = 'http://localhost:8797/active_a_pending_user/'+this.props.item.username
    Axios.put(link).then(result => {
      console.log(result)
    })
    .catch(err => { throw err })
  }

  render() {
    return (
      <div>
        <ListGroup.Item className="list-item" hidden={false}>{this.props.item.name}&nbsp;/&nbsp;{this.props.item.vehicleBrand}&nbsp;/&nbsp;{this.props.item.vehicleId}<div className="div-butt-float-right"><Button onClick={this.activeAPendingUser}>Duyệt</Button></div></ListGroup.Item>
      </div>
    )
  }
}
