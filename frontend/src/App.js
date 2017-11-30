import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import { fetchCategories, fetchPosts, updatePostVote, fetchAllComments, delPost } from './actions'
import { NavLink, Route, Switch } from 'react-router-dom'
import { Container, Icon, Header} from 'semantic-ui-react';

import Categories from './components/Categories'
import Posts from './components/Posts'
import Post from './components/Post'
import NotFoundPage from './components/notFoundPage'

const style = {
  h1: {
    marginTop: '3em',
    textTransform: 'capitalize'
  },
  h2: {
    margin: '4em 0em 2em',
  },
  h3: {
    marginTop: '2em',
    padding: '2em 0em',
  },
  last: {
    marginBottom: '300px',
  },
}

class App extends Component {

  componentDidMount() {
    this.props.loadPosts()
    this.props.loadCategories()
    this.props.loadAllComments()
  }

  render() {
    return (
      <Container>
        <Switch>
          <Route exact path="/cats/:category" render={({ history, match }) => (
            <div>
              <NavLink to='/'>
                <Icon name='home' size='big' />
              </NavLink>
              <Header as='h1' content={match.params.category} style={style.h1} textAlign='center' />
              <Posts posts={this.props.posts} category={match.params.category} onVote={this.props.onVote} onDeletePost={this.props.onDeletePost} />
            </div>
          )} />
          <Route exact path="/cats/:category/:post_id" render={({ history, match }) => (
            <div>
              <Post id={match.params.post_id}
                category={match.params.category}
                onDeletePost={this.props.onDeletePost} />
            </div>
          )} />
          <Route exact path="/cats/:category/:post_id/edit" render={({ history, match }) => (
            <div>
              <Post id={match.params.post_id}
                category={match.params.category}
                onDeletePost={this.props.onDeletePost}
                editMode={true}/>
            </div>
          )} />
          <Route exact path='/' render={() => (
            <div>
                <Categories categories={this.props.categories} />
                <Posts posts={this.props.posts} onVote={this.props.onVote} onDeletePost={this.props.onDeletePost} category='' />
            </div>


          )} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.categories ? state.categories.categories : [],
    posts: state.posts.posts ? state.posts.posts : []
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: data => dispatch(fetchCategories()),
    loadPosts: data => dispatch(fetchPosts(data)),
    onVote: (id, vote) => dispatch(updatePostVote(id, vote)),
    loadAllComments: data => dispatch(fetchAllComments()),
    onDeletePost: id => dispatch(delPost(id))
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(App)