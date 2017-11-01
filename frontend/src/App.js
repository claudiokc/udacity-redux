import React, { Component } from 'react';
import './App.css';
import Home from './components/home';
import PostLanding from './components/posts/postLanding';
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
        </div>
      </Router>
    );
  }
}

export default (App);
