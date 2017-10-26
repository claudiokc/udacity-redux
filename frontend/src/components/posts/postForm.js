import React from 'react';
import { Button, Form, Dropdown } from 'semantic-ui-react'

const PostForm = ({onSubmit, onChange}) => {
  let data = [{text: 'react', value:'react', id:'1'}, 
        {text:'redux', value:'redux', id:'2'}, 
        {text:'udacity', value:'udacity', id:'3'}]
    return (
      <Form  onSubmit={onSubmit}>
         <Form.Field label="Category" >
         </Form.Field>
         <Dropdown placeholder='Select a Category' fluid selection options={data}  onChange={onChange}/>
        <Form.Field label="Author" 
          placeholder="Author" 
          name="Author" 
          onChange={onChange}
          control="input">
        </Form.Field>
        <Form.Field label="Title" 
          placeholder="Title" 
          name="Title" 
          onChange={onChange}
          control="input">
        </Form.Field>
        <Form.Field label="Body" 
          placeholder="Body" 
          name="Body"
          onChange={onChange}
          control="input">
        </Form.Field>
        <Form.Button content='Submit' />
        <Button positive fluid type="submit">Guardar</Button>
      </Form>
    );
}

export default PostForm;