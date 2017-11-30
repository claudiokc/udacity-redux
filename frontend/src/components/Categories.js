import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Icon, Container, Header, Table } from 'semantic-ui-react'

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

class Categories extends Component {

    static propTypes = {
        categories: PropTypes.array.isRequired
    }

    render() {
        return (
            <Container>
                <Header as='h3' textAlign='center' style={style.h3} content='Categories'/>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Add Post</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                  {this.props.categories.map((category, i) =>
                      <Table.Row key={i}>
                        <Table.Cell>
                          <Header as='h4'>
                            <Header.Content>
                              <NavLink to={'/cats/' + category.name}>{category.name}</NavLink>
                            </Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>
                          <NavLink to={'/cats/' + category.name + '/new'}>
                            <Icon name='add square' size='large'/>
                          </NavLink>
                        </Table.Cell>
                      </Table.Row>
                  )}
                  </Table.Body>
                </Table>
            </Container>
        )
    }
}

export default Categories