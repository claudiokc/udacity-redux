import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoriesActions  from '../../actions/categoriesActions';
import { Table } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class Categories extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          categories: []
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
            <div>
              <Table sortable celled fixed>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell >
                      Categories
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row key={0}>
                  {categories.length >0 && categories.map(category =>
                    <Table.Cell key={category.path}><Link to={`/post/category/${category.path}`}>{category.name}</Link></Table.Cell>
                  )}
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
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