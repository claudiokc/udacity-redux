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
            console.log()
        });
    }
    date = (date) => {
        let newDate = (new Date(date));
        return newDate.getFullYear()+'-'+newDate.getMonth()+'-'+newDate.getDate();
    }
    render() {
        const {title, author, timestamp, body, voteScore} = this.state.post;
    return (
        <Card fluid>
            <Card.Header>
                <Segment color='green'>Post Landing</Segment>
            </Card.Header>
                <h1>{title}</h1>
                <h3>{body}</h3>
                <p>author: {author}</p>
                <p>date: {this.date(timestamp)}</p>
                <p>voteScore:{voteScore}</p>
                <Card fluid color='red' header='Comments' />
                <Comments postId={this.props.match.params.id}/>
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