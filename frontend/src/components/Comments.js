import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import Modal from 'react-modal'
import { Container, Icon, Header, Table, Form, Button, Modal } from 'semantic-ui-react'
const uuidV4 = require('uuid/v4')


class Comments extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            body: '',
            author: '',
            parentId: this.props.parentId,
            modalIsOpen: false,
            editMode: false,
            error: false
        }

        this.addComment = this.addComment.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.editComment = this.editComment.bind(this)
    }

    addComment() {
        this.setState({ id: uuidV4(), body: '', author: '', modalIsOpen: true, editMode: false })
    }

    closeModal() {
        this.setState({ modalIsOpen: false })
    }

    editComment(comment) {
        this.setState({ id: comment.id, body: comment.body, author: comment.author, modalIsOpen: true, editMode: true })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.body.trim() && this.state.author.trim()) {
            var savedComment = { ...this.state, timestamp: new Date().getTime() }
            if (this.state.editMode) {
                this.props.onUpdateComment(savedComment.id, savedComment.body, savedComment.author)
            } else {
                this.props.onAddComment(savedComment)
            }
            this.setState({ error: false })
            this.closeModal()
        } else {
            this.setState({ error: true })
        }
    }

    static propTypes = {
        comments: PropTypes.array.isRequired,
        onCommentVote: PropTypes.func.isRequired,
        onAddComment: PropTypes.func.isRequired,
        onDeleteComment: PropTypes.func.isRequired,
        onUpdateComment: PropTypes.func.isRequired
    }

    render() {
      const {body, author} = this.state
        return (
            <Container>
                <Header as='h2' color='teal' textAlign='center'>
                  Comments
                </Header>

                <Modal
                  trigger={<Button color='teal' fluid size='large'  onClick={this.addComment}>Add Comment</Button>}
                  open={this.state.modalIsOpen}
                  onClose={this.closeModal}
                  basic
                  size='small'
                >
                  <Header icon='browser' content='Add/Edit Comment' />
                  <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Input
                        fluid
                        name='body'
                        value={body}
                        placeholder='Add comment here'
                        onChange={this.handleInputChange}
                      />
                      <Form.Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        name='author'
                        value={author}
                        placeholder='Author'
                        onChange={this.handleInputChange}
                      />
                      <Button color='teal' fluid size='large'  type="submit" >Save</Button>
                    </Form>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color='green' onClick={this.closeModal} inverted>
                      <Icon name='checkmark' /> Got it
                    </Button>
                  </Modal.Actions>
                </Modal>
                <Container>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Comment</Table.HeaderCell>
                      <Table.HeaderCell>Author</Table.HeaderCell>
                      <Table.HeaderCell>Votes</Table.HeaderCell>
                      <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                {this.props.comments.map((comment, i) =>
                  <Table.Row key={comment.id}>
                    <Table.Cell>{comment.body}</Table.Cell>
                    <Table.Cell>{comment.author}</Table.Cell>
                    <Table.Cell>{comment.voteScore}</Table.Cell>
                    <Table.Cell>
                      <button onClick={e => {
                          e.preventDefault()
                          this.props.onCommentVote(comment.id, 'upVote')
                      }}><Icon name='thumbs outline up' size='large'/></button>
                      <button onClick={e => {
                          e.preventDefault()
                          this.props.onCommentVote(comment.id, 'downVote')
                      }}><Icon name='thumbs outline down' size='large'/></button>
                      <button onClick={e => {
                          e.preventDefault()
                          this.editComment(comment)
                      }}><Icon name='edit' size='large'/></button>
                      <button onClick={e => {
                          e.preventDefault()
                          this.props.onDeleteComment(comment)
                      }}><Icon name='delete' size='large'/></button>
                    </Table.Cell>
                  </Table.Row>
                )}
                  </Table.Body>
                </Table>
                </Container>
            </Container>
        )
    }
}

export default Comments