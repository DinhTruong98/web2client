import React, { Component } from 'react'
import { Route } from "react-router-dom";

import IndexPage from '../../components/indexPage';
import AboutPage from '../../components/aboutPage';
import PartnerPage from '../../components/partnerPage';

export default class contents extends Component {
  render() {
    return (
      <div>
          <IndexPage />
      </div>
    )
  }
}
