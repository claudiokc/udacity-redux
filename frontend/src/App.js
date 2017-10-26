import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import * as categories from './actions/categoriesActions';
import Home from './components/home';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Home}/>
      </Router>
    );
  }
}

export default (App);
