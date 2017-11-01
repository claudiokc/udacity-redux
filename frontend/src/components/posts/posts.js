import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions  from '../../actions/postActions';
import {Segment, Card} from 'semantic-ui-react';
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

      
    reload = () => {
      this.props.actions.loadAllpost()
      .then(() => {
        this.setState({Post: this.props.Post});
      })
    }

    componentDidMount() {
      this.reload();
    }


     handleSubmit = () =>{
        this.props.actions.createPost(this.state.post)
        .then(() => {
          this.setState({Post: this.props.Post});
        })
        .catch(error => {
          console.log(error);
        }); 
      }
     
      
    
    updatePost = (event, data) => {
      let field = event.target.name;
      let post = Object.assign({}, this.state.post);
      post[field] = event.target.value;
      if (data) {
        field = data.name;
        post[field] = data.value;
        this.setState({post: post});
      } else if (field) {
        this.setState({post: post});
      }
      return;
    }

    savePost = (event) => {
      event.preventDefault();
        if (!this.formIsValid()) {
          return;
        }
      }
    
    render() {
        const posts = this.state.Post;
        return (
          <div>
            <Card fluid>
              <Card.Header>
                <Segment color='green'>List of Post</Segment>
              </Card.Header>
              <Card.Content extra>
                <PostList onReload={this.reload} data={posts}/>
              </Card.Content>
            </Card>
            <Card fluid>
              <Card.Header>
              <Segment color='green'>Create Post </Segment>
              </Card.Header>
              <Card.Content extra>
              <PostForm onSubmit={this.handleSubmit}
                onSave={this.savePost}
                onChange={this.updatePost}
            />
              </Card.Content>
            </Card>
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