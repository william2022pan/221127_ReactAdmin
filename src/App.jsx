import React, { Component } from 'react'
import { Button, message } from 'antd'

export default class App extends Component {

  handleClick = () => {
    message.success('成功啦...');
  }

  render() {
    return (
      <Button type="primary" onClick={this.handleClick}>Primary Button</Button>
      // <div>APP2...</div>
    )
  }
}