import React, { Component } from 'react'
import {
  Form,
  Select,
  Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option

class UpdateForm extends Component {
  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Form>
        <Item>
          {
            getFieldDecorator('categoryName', {
              initialValue: ''
            })(
              <Input placeholder='请输入分类名称' />
            )
          }     
        </Item>           
      </Form>
    )
  }
}

export default Form.create()(UpdateForm)
