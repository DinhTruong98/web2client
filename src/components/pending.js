import React, { Component } from 'react'
import ListItem from './pendingListItem'
import {ListGroup} from 'react-bootstrap'

export default class pending extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return(
        <div>
            <h3>Danh sách đăng kí cần duyệt</h3>
            <ListGroup>
                {this.props.list.map((item)=>{
                    return <ListItem key={item.username} item={item} />
                })}
            </ListGroup>
        </div>
    );
  }
}
