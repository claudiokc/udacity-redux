import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions  from '../../actions/postActions';

class PostVote extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            postId:  props.postId,
        }
    }

    vote = (vote) => {
        this.props.actions.votePost({vote: vote, id: this.state.postId})
        .then(() => {
          this.props.onReload();
        })
        .catch(error => {
          console.log(error);
        });
    }
    render() {
        return (
            <div>
                <Button.Group>
                    <Button onClick={() => this.vote('downVote')}
                    color='red'
                    icon='dislike outline'
                />
                <Button.Or />
                <Button onClick={() => this.vote('upVote')}
                    color='blue'
                    icon='like'
                />
                </Button.Group>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      Result:  state.posts
    };
  }


  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(postActions, dispatch)
    };
  }

export default  connect(mapStateToProps, mapDispatchToProps)(PostVote);