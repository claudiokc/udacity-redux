import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink, Redirect } from 'react-router-dom'
import { Container, Header, Table, Item, Icon } from 'semantic-ui-react'

const style = {
  h1: {
    marginTop: '3em',
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


class Posts extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sort: '',
            sortField: ''
        }

        this.sort = this.sort.bind(this)
    }

    static propTypes = {
        posts: PropTypes.array.isRequired,
        category: PropTypes.string.isRequired,
        onVote: PropTypes.func.isRequired,
        onDeletePost: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.setState({ posts: this.findPostsByCategory() })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ posts: this.findPostsByCategory() })
    }

    deletePost(id) {
        var c = window.confirm("Are you sure you want to delete the post?")
        if (c === true) {
            this.props.onDeletePost(id)
        }
    }

    editPost = (postId) => {
      this.setState({ redirect: true })
    }

    sort(field) {
        var sposts, sortby = 'asc'
        if (field === this.state.sortField) sortby = this.state.sortby === 'asc' ? 'desc' : 'asc'
        if (field === 'title' || field === 'author') {
            sposts = this.props.posts.sort((a, b) => sortby === 'asc' ?
                a[field].toLowerCase() > b[field].toLowerCase() :
                a[field].toLowerCase() < b[field].toLowerCase())
        } else {
            sposts = this.props.posts.sort((a, b) => sortby === 'asc' ? a[field] > b[field] : a[field] < b[field])
        }
        this.setState({ posts: sposts, sortField: field, sortby: sortby })
    }

    render() {
        return (
            <Container>
                <Header as='h3' textAlign='center' style={style.h3} content='Posts'/>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                          <Item.Header as='a' onClick={() => { this.sort('title') }}>Title</Item.Header>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                          <Item.Header as='a' onClick={() => { this.sort('author') }}>Author</Item.Header>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Item.Header as='a' onClick={() => { this.sort('timestamp') }}>Timestamp</Item.Header>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Item.Header as='a' onClick={() => { this.sort('commentCount') }}># Comments</Item.Header>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Item.Header as='a' onClick={() => { this.sort('voteScore') }}>Votes</Item.Header>
                      </Table.HeaderCell>
                      <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                  {this.findPostsByCategory().map((post, i) =>
                      <Table.Row key={i}>
                        <Table.Cell>
                            <NavLink to={'/cats/' + post.category + '/' + post.id}>{post.title}</NavLink>
                        </Table.Cell>
                        <Table.Cell>{post.author}</Table.Cell>
                        <Table.Cell>{new Date(post.timestamp).toLocaleString()}</Table.Cell>
                        <Table.Cell>{post.commentCount}</Table.Cell>
                        <Table.Cell>{post.voteScore}</Table.Cell>
                        <Table.Cell>
                            <button onClick={e => {
                                e.preventDefault()
                                this.props.onVote(post.id, 'upVote')
                            }}><Icon disabled name='thumbs outline up' size='large'/></button>
                            <button onClick={e => {
                                e.preventDefault()
                                this.props.onVote(post.id, 'downVote')
                            }}><Icon disabled name='thumbs outline down' size='large'/></button>
                            <button onClick={e => {
                                e.preventDefault()
                                this.editPost(post.id)
                            }}><Icon disabled name='edit' size='large'/></button>
                            <button onClick={e => {
                                e.preventDefault()
                                this.deletePost(post.id)
                            }}><Icon disabled name='delete' size='large'/></button>
                        </Table.Cell>
                        {this.state.redirect  && (<Redirect to={'/cats/' + post.category + '/' + post.id + '/edit'} />)}
                      </Table.Row>
                  )}
                  </Table.Body>
                </Table>
            </Container>
        )
    }

    findPostsByCategory = () => {
        if (!this.props.category) return this.props.posts;
        else return this.props.posts.filter(p => p.category === this.props.category)
    }
}

export default Posts