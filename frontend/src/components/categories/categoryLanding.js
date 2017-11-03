import React, {Component} from 'react';
import {Card, Segment} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions  from '../../actions/postActions';
// import Comments from '../comments/comments';

class CategoryLanding extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            category: this.props.category
        };
        console.log(this.props)
        console.log(props)
    }

    componentDidMount() {
        this.props.actions.loadUniquePost(this.props.match.params.id).then(() => {
            this.setState({post: this.props.Post});
        });
    }

    render() {
        return (
            <Card fluid>
                <Card.Header>
                    <Segment color='green'>Catery:</Segment>
                </Card.Header>
            </Card>
        );
    }
}


function mapStateToProps(state) {
    return {
      data:  state.posts.data
    };
  }


  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(postActions, dispatch)
    };
  }


export default  connect(mapStateToProps, mapDispatchToProps)(CategoryLanding);