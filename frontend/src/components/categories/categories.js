import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoriesActions  from '../../actions/categoriesActions';

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
                {categories.length >0 && categories.map(category =>
                <div key={category.path}> 
                    <div>{category.name}</div>
                </div>
            )}
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