import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import * as categories from './actions/categoriesActions';
import * as posts from './actions/postActions';

class App extends Component {

  componentDidMount () {
    // this.props.actions.loadCategories()
    //   .then(() => {
    //     console.log('load');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
      // this.props.actions.loadPostCategory('redux')
      // .then(() => {
      //   console.log('load');
      // })
      // .catch(error => {
      //   console.log(error);
      // });
    this.props.actions.createPost()
      .then(() => {
        console.log('load');
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}


function mapStateToProps(state) {
  console.log(state);
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(posts, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
