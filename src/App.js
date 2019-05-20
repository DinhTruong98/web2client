import React from 'react';
import './App.css';
import Header from './containers/header/header';
import Footer from './containers/footer/footer';
//import Content from './containers/contents/contents';
import IndexPage from './components/indexPage';
import AboutPage from './components/aboutPage';
import PartnerPage from './components/partnerPage';
import LoginPage from './components/login';
import RegisterPage from './components/register';
import AdminPage from './components/admin';

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
    <Header />
    <Route exact path="/" component={IndexPage} />
    <Route exact path="/partner" component={PartnerPage} />
    <Route exact path="/about" component={AboutPage} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/register" component={RegisterPage} />
    <Route exact path="/admin" component={AdminPage} />
    <Footer />
    </div>
    </Router>
  );
}

export default App;
