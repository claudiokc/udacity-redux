import React, { Component } from 'react';
import './App.css';
import Home from './components/home';
import PostLanding from './components/posts/postLanding';
import CategoryLanding from './components/categories/categoryLanding';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/post/landing/:id" component={PostLanding}/>
          <Route path="/category/:category" component={CategoryLanding}/>
        </div>
      </Router>
    );
  }
}

export default (App);
