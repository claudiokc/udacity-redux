import React, {Component} from 'react';
import {Card, Segment} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions  from '../../actions/postActions';
import Comments from '../comments/comments';

class PostLanding extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            post: []
        };
      }
    componentDidMount() {
        this.props.actions.loadUniquePost(this.props.match.params.id).then(() => {
            this.setState({post: this.props.Post});
        });
    }
    
    render() {
        const {title, body} = this.state.post;
    return (
        <Card fluid>
            <Card.Header>
            <Segment color='green'>Post Landing</Segment>
                </Card.Header>
            <Card.Content extra>
                <h1>Name: {title}</h1>
                <h3>
                    {body}
                </h3>
                <Comments postId={this.props.match.params.id}/>
            </Card.Content>
        </Card>  
    );
  }
}


function mapStateToProps(state) {
    return {
      Post:  state.posts.data
    };
  }


  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(postActions, dispatch)
    };
  }


export default  connect(mapStateToProps, mapDispatchToProps)(PostLanding);