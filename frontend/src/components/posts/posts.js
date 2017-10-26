import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions  from '../../actions/postActions';
import PostList from './postList';
import PostForm from './postForm';

class Post extends Component {

     constructor(props, context) {
        super(props, context);
        this.state = {
          post: Object.assign({}, props.post),
          Post: []
        };

        this.savePost = this.savePost.bind(this);
        this.updatePost = this.updatePost.bind(this);
      }
    componentDidMount() {
        this.props.actions.loadAllpost()
        .then(() => {
          this.setState({Post: this.props.Post});
        })
        .catch(error => {
          console.log(error);
        });
    }

     handleSubmit = (e, { name, value }) =>{
        console.log(e);
        console.log( name, value);
      }

    
    updatePost = (event, data) => {
      const field = event.target.name;
      let post = Object.assign({}, this.state.post);
      if (data) {
        console.log(data.value);
      }
      console.log( event.target.value);
      post[field] = event.target.value;
      return this.setState({post: post});
    }

    savePost = (event) => {
        console.log('saved');
        event.preventDefault();
        if (!this.formIsValid()) {
          return;
        }
      }
    render() {
        const posts = this.state.Post;
        return (
          <div>
            <PostList data={posts}/>
            <PostForm onSubmit={this.handleSubmit}
                onSave={this.savePost}
                onChange={this.updatePost}
            />
          </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      Post:  state.posts
    };
  }


  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(postActions, dispatch)
    };
  }

export default  connect(mapStateToProps, mapDispatchToProps)(Post);