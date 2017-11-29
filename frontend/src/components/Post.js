import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Container, Icon, Header, Table, Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

import {
    updatePostVote, fetchComments, fetchPost, fetchPosts,
    updateCommentVote, addNewPost, updatePost,
    addNewComment, delComment, updateComment, updateCommentCount
} from '../actions'
import Comments from './Comments'
const uuidV4 = require('uuid/v4');


class Post extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        comments: PropTypes.array.isRequired,
        loadPostComments: PropTypes.func.isRequired,
        onPostVote: PropTypes.func.isRequired,
        onCommentVote: PropTypes.func.isRequired,
        onDeletePost: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            category: this.props.category,
            id: this.props.id === 'new' ? uuidV4() : this.props.id,
            title: '',
            body: '',
            author: '',
            voteScore: 1,
            editingMode: this.props.id === 'new',
            timestamp: new Date().getTime(),
            redirectHome: false
        }
    }

    handleChange = (event) => {

        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    updatePost = () => {
        this.props.onUpdatePost(this.state.id, this.state.title, this.state.body, this.state.author)
    }

    deletePost = () => {
        var c = window.confirm("Are you sure you want to delete the post?")
        if (c === true) {
            this.props.onDeletePost(this.state.id)
            this.setState({ redirectHome: true })
        }
    }

    handleSubmit = () => {
      if (this.props.id === 'new') {
        const {title, author, body, category, id} = this.state
          var newPost = {
            id: id,
            title: title,
            body: body,
            author: author,
            category: category,
            timestamp: new Date()
          }
          this.props.onAddPost(newPost)
      }
      this.updatePost()
      this.toggleEditMode()
    }

    handleVote = (action) => {
      this.props.onPostVote(this.state.id, action)
      if (this.props.id === 'new') {
        this.setState((prevState)=>{
          return { voteScore: action === 'upVote' ? prevState.voteScore + 1 : prevState.voteScore - 1 }
        })
      }
    }

    componentDidMount() {
      if (this.props.posts.length === 0) {
        this.setState({ redirectHome: true })
      }
      this.props.loadPosts()
      this.props.loadPost(this.props.id)
      this.props.loadPostComments(this.props.id)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.post) {
            this.setState({
                title: nextProps.post.title,
                body: nextProps.post.body,
                author: nextProps.post.author,
                voteScore: nextProps.post.voteScore,
                timestamp: nextProps.post.timestamp
            })
        }
    }

    toggleEditMode = () => {
      this.setState((prevState) => {
        return {editingMode: !prevState.editingMode };
      });
    }

    render() {
      const { title, body , author, voteScore, editingMode } = this.state
      const { category } = this.props
        return (
            <Container>
                <NavLink to='/'>
                    <Icon name='home' size='big' />
                </NavLink>
                { !editingMode ? (
                <div>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Post Info</Table.HeaderCell>
                      <Table.HeaderCell>Title</Table.HeaderCell>
                      <Table.HeaderCell>Body</Table.HeaderCell>
                      <Table.HeaderCell>Votes</Table.HeaderCell>
                      <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Header as='h4'>
                          <Header.Content>
                          <NavLink to={'/' + category}>Category: { category }</NavLink>
                            <Header.Subheader>{author}</Header.Subheader>
                            <Header.Subheader>{new Date(this.state.timestamp).toLocaleString()}</Header.Subheader>
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>{title}</Table.Cell>
                      <Table.Cell>{body}</Table.Cell>
                      <Table.Cell>{voteScore}</Table.Cell>
                      <Table.Cell>
                        <Button
                          animated='fade'
                          onClick={ e => {
                            e.preventDefault()
                            this.handleVote('upVote')}}>
                          <Icon name='thumbs outline up'/>
                        </Button>
                        <Button
                          animated='fade'
                          onClick={ e => {
                            e.preventDefault()
                            this.handleVote('downVote')}}>
                          <Icon name='thumbs outline down'/>
                        </Button>
                        <Button
                          animated='fade'
                          icon='edit'
                          content='Edit'
                          labelPosition='right'
                          onClick={e => {
                            e.preventDefault()
                            this.toggleEditMode()}} />
                        <Button
                          animated='fade'
                          icon='delete'
                          content='Delete'
                          labelPosition='right'
                          onClick={e => {
                            e.preventDefault()
                            this.deletePost()}} />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                  <Comments parentId={this.state.id}
                    comments={this.props.comments}
                    onCommentVote={this.props.onCommentVote}
                    onAddComment={this.props.onAddComment}
                    onDeleteComment={this.props.onDeleteComment}
                    onUpdateComment={this.props.onUpdateComment} />
                </div>) : (
                <div>
                <Header as='h2' color='teal' textAlign='center'>
                  Create/Edit Post
                </Header>
                <Form size='large' onSubmit={this.handleSubmit}>
                    <Form.Input
                      fluid
                      icon='text width'
                      iconPosition='left'
                      name='title'
                      value={title}
                      placeholder='Title'
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      fluid
                      icon='bold'
                      iconPosition='left'
                      name='body'
                      value={body}
                      placeholder='Body'
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      fluid
                      icon='user'
                      iconPosition='left'
                      name='author'
                      value={author}
                      placeholder='Author'
                      onChange={this.handleChange}
                    />
                    <Form.Button color='teal' fluid size='large' content='Save' type='submit'/>
                    {/*<Button color='teal' fluid size='large'  type="submit" >Save</Button>*/}
                </Form>
                </div>)}
                {this.state.redirectHome && (<Redirect to='/' />)}
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    post: state.posts.posts ? state.posts.posts[state.posts.selectedIndex] : {},
    comments: state.comments.comments ? state.comments.comments : [],
    posts: state.posts.posts ? state.posts.posts : []
})

const mapDispatchToProps = dispatch => ({
    onPostVote: (postId, vote) => {
        dispatch(updatePostVote(postId, vote))
    },
    onCommentVote: (commentId, vote) => {
        dispatch(updateCommentVote(commentId, vote))
    },
    loadPosts: data => dispatch(fetchPosts(data)),
    loadPost: id => {
        dispatch(fetchPost(id))
    },
    loadPostComments: id => {
        dispatch(fetchComments(id))
    },
    onAddPost: post => {
        dispatch(addNewPost(post))
    },
    onUpdatePost: (id, title, body, author) => {
        dispatch(updatePost(id, title, body, author))
    },
    onAddComment: comment => {
        dispatch(addNewComment(comment))
        dispatch(updateCommentCount(comment.parentId, 1, 'add'))
    },
    onDeleteComment: comment => {
        var c = window.confirm("Delete the comment?")
        if (c === true) {
            dispatch(delComment(comment.id))
            dispatch(updateCommentCount(comment.parentId, 1, 'del'))
        }
    },
    onUpdateComment: (id, body, author) => {
        dispatch(updateComment(id, body, author))
    }
})

export default connect(
    mapStateToProps, mapDispatchToProps, null, {
        pure: false
    }
)(Post)