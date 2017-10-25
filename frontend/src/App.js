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

  // componentDidMount () {
  //   // this.props.actions.loadCategories()
  //   //   .then(() => {
  //   //     console.log('load');
  //   //   })
  //   //   .catch(error => {
  //   //     console.log(error);
  //   //   });
  //     this.props.actions.loadUniquePost("11231231")
  //     .then(() => {
  //       console.log('load');
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  //   // this.props.actions.loadAllpost()
  //   //   .then(() => {
  //   //     console.log('load');
  //   //   })
  //   //   .catch(error => {
  //   //     console.log(error);
  //   //   });
  // }
  render() {
    return (
      <Router>
      {/* // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div> */}
        <Route path="/" component={Home}/>
      </Router>
    );
  }
}


// function mapStateToProps(state) {
//   console.log(state);
//   return {

//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(posts, dispatch)
//   };
// }

export default (App);
