import React from 'react';
import { Table, Divider } from 'semantic-ui-react';
import PostModal from './postModal';
import PostVote from './postVote';
import {Link} from 'react-router-dom';
const PostList = ({data, onReload}) => {
    return (
      <div>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                id
              </Table.HeaderCell>
              <Table.HeaderCell >
                author
              </Table.HeaderCell>
              <Table.HeaderCell >
                title
              </Table.HeaderCell>
              <Table.HeaderCell>
                body
              </Table.HeaderCell>
              <Table.HeaderCell>
                commentCount
              </Table.HeaderCell>
              <Table.HeaderCell>
                category
              </Table.HeaderCell>
              <Table.HeaderCell>
                voteScore
              </Table.HeaderCell>
              <Table.HeaderCell>
                Edit Post
              </Table.HeaderCell>
              <Table.HeaderCell>
                Vote
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(({author, body, category, commentCount, deleted, id, title, voteScore}) => (
              <Table.Row key={id}>
                <Table.Cell><Link to={`/post/landing/${id}`}>{id}</Link></Table.Cell>
                <Table.Cell>{author}</Table.Cell>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{body}</Table.Cell>
                <Table.Cell>{commentCount}</Table.Cell>
                <Table.Cell>{category}</Table.Cell>
                <Table.Cell>{voteScore}</Table.Cell>
                <Table.Cell><PostModal onReload={onReload} post={{id, author, body, category, title}}/></Table.Cell>
                <Table.Cell>
                  <PostVote postId={id}  onReload={onReload}/>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Divider />
      </div>
    );
}

export default PostList;