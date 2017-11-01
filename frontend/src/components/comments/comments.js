import React, {Component} from 'react';
import {Comment, Button, Form} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as commentActions  from '../../actions/commentActions';

class Comments extends Component {
     constructor(props, context) {
        super(props, context);
        this.state = {
          comment: {},
          data: []
        };

        this.updateComment = this.updateComment.bind(this);
      }

    date = (date) => {
      let newDate = (new Date(date));
    return  newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds() + '-' + newDate.getFullYear();
    
  }
    reaload = () => {
       this.props.actions.loadComments(this.props.postId)
      .then(() => {
        this.setState({data: this.props.comments.data});
      });
    }

    componentDidMount() {
      this.reaload();
    }


    
    updateComment = (event) => {
      let field = event.target.name;
      let comment = Object.assign({}, this.state.comment);
      comment[field] = event.target.value;
      if (field) {
        this.setState({comment: comment});
      }
      return;
    }
    saveComment = () => {
      this.props.actions.createComment(this.props.postId, this.state.comment).then(() => {
         this.reaload();
      });
    }
    render() {
      const data = this.state.data;
         return (
            <Comment.Group>
            {data.map(({id, timestamp, body}) => (
              <Comment key={id}>
              <Comment.Content>
                <Comment.Metadata>
                  <div>{this.date(timestamp)}</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>{body.Comment}.</p>
                </Comment.Text>
              </Comment.Content>
            </Comment>
            ))}
            <Form onSubmit={this.saveComment} reply>
              <Form.TextArea 
                placeholder="Comment" 
                name="Comment"
                onChange={this.updateComment}
              />
              <Button type="submit" content='Add Comment' labelPosition='left' icon='edit' primary />
            </Form>
          </Comment.Group>
         );
    }
}

function mapStateToProps(state) {
    return {
      comments:  state.comments
    };
  }


  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(commentActions, dispatch)
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Comments);