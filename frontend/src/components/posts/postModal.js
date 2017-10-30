import React, { Component } from 'react'
import { Button, Header, Form, Modal, Dropdown, Icon } from 'semantic-ui-react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as postActions  from '../../actions/postActions';

class PostModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      postModal: {},
      categoryList: [
        {text: 'react', value:'react', id:'1'}, 
        {text:'redux', value:'redux', id:'2'}, 
        {text:'udacity', value:'udacity', id:'3'}
      ]
    };
    this.updateChange = this.updateChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }  
  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  updateChange(e, dropdown) {
    let field = e.target.name;
    let postModal = Object.assign({}, this.state.postModal);
    postModal[field] = e.target.value;
    if (dropdown) {
      field = dropdown.name;
      postModal[field] = dropdown.value;
      this.setState({postModal: postModal});
    } else if (field) {
      this.setState({postModal: postModal});
    }
    return;
  }

  handleSubmit(e) {
    this.props.actions.updatePost(this.state.postModal).then(() => {
        this.props.onReload();
        this.close();
      });
  }
  
  componentDidMount() {
    this.setState({postModal: this.props.post});
  }
   render() {
    const { open, dimmer } = this.state
    return (
      <div>
        <Button basic color='green' onClick={this.show('inverted')}> <Icon name="edit" size='large'/></Button>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content >
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <Form onSubmit={this.handleSubmit}>
                  <Form.Field label="Title" 
                    placeholder="Title" 
                    name="title"
                    value= {this.state.postModal.title}
                    onChange = {this.updateChange}
                    control="input">
                  </Form.Field>
                  <Form.Field label="Category" >
                  </Form.Field>
                  <Dropdown placeholder='Select a Category' fluid 
                    selection name="category"
                    value= {this.state.postModal.category}
                    options={this.state.categoryList}  
                    onChange={this.updateChange}/>
                  <Form.Field label="Body" 
                    placeholder="Body" 
                    name="body"
                    value= {this.state.postModal.body}
                    onChange = {this.updateChange}
                    control="input">
                  </Form.Field>
                  <Button positive fluid type="submit">Guardar</Button>
                </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    PostUpdated:  state.posts
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(postActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);