import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoriesActions  from '../../actions/categoriesActions';
import { Table } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }

    componentDidMount() {
        this.props.actions.loadCategories()
        .then(() => {
          this.setState({categories: this.props.categories.data.categories});
        })
        .catch(error => {
          console.log(error);
        });
    }
    render() {
        const categories = this.state.categories;
        return (
            <Table fixed singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign='center' colSpan={categories.length}>Categories</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                      {categories.map((category,i) =>
                          <Table.Cell textAlign='center' key={i}><Link to={`/category/${category.name}`}>{category.name}</Link></Table.Cell>
                      )}
                </Table.Row>
              </Table.Body>
            </Table>
        )
    }
}

function mapStateToProps(state) {
    return {
      categories:  state.categories
    };
  }


  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(categoriesActions, dispatch)
    };
  }
export default connect(mapStateToProps, mapDispatchToProps)(Categories);