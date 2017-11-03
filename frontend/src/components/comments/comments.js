import React, {Component} from 'react';
import {Comment, Button, Form} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as commentActions  from '../../actions/commentActions';

class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: 'somebody',
            body: '',
            data: []
        };

        this.updateAuthor = this.updateAuthor.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    date = (date) => {
        let newDate = (new Date(date));
        return newDate.getFullYear()+'-'+newDate.getMonth()+'-'+newDate.getDate();
    }

    reaload = () => {
        this.props.actions.loadComments(this.props.postId)
        .then((algo) => {
            this.setState({data: this.props.comments.data});
        });
    }

    componentDidMount() {
        this.reaload();
    }

    updateAuthor = (event) => {
        let author;
        author = event.target.value;
        if (author) {
            this.setState({
                author: author
            });
        }
    }

    updateComment = (event) => {
        let comment;
        comment = event.target.value;
        console.log(comment);
        if (comment) {
            this.setState({
                comment: comment
            });
        }
    }

    saveComment = () => {
        this.props.actions.createComment(this.props.postId, this.state).then(() => {
            this.reaload();
        });
    }

    render() {
      const data = this.state.data;
      return (
        <Comment.Group>

        {data.map(({id, author, timestamp, body}) => (
          <Comment key={id}>
          <Comment.Content>
          <Comment.Author as='an'>{author}</Comment.Author>
          <Comment.Metadata>
          <div>{this.date(timestamp)}</div>
          </Comment.Metadata>
          <Comment.Text>
            {body}
          </Comment.Text>
          </Comment.Content>
          </Comment>
          ))}
        <Form onSubmit={this.saveComment} reply>
        <Form.Field>
        <label>Author</label>
        <input
        name='Author'
        placeholder='Nickname'
        onChange={this.updateAuthor}
        />
        </Form.Field>
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