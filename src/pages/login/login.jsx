import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd';

import './login.less'
import logo from '../../assets/images/logo.png'
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom';

const Item = Form.Item

class Login extends Component {

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('提交登陆的ajax请求', values);
        const {username, password} = values     
        const result = await reqLogin(username, password)
        // console.log('请求成功',result);
        // const result = response.data
        if (result.status === 0) {
          message.success('登陆成功')

          const user = result.data
          memoryUtils.user = user
          storageUtils.saveUser(user)

          this.props.history.replace('/')
        } else {
          message.error(result.msg)
        }


      } else {
        console.log('检验失败');
      }
    });

    // const form = this.props.form
    // const values = form.getFieldsValue()
    // console.log('handleSubmit()', values);
  }

  validatePwd = (rule, value, callback) => {
    if (!value) {
      callback('密码必须输入')
    } else if (value.length < 4) {
      callback('密码长度不能小于4位')
    } else if (value.length > 12) {
      callback('密码长度不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文，数字或下划线组成')
    } else {
      callback()
    }
  }

  render() {

    const user = memoryUtils.user
    if (user && user._id) {
      return <Redirect to='/' />
    }

    const form = this.props.form;
    const { getFieldDecorator } = form;

    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo" />
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className='login-content'>
          <h2>用户登陆</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {
                getFieldDecorator('username', {
                  rules: [
                    { required: true, whitespace: true, message: '用户名必须输入' },
                    { min: 4, message: '用户名至少4位' },
                    { max: 12, message: '用户名最多12位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，数字或下划线组成' }
                  ],
                  initialValue: 'admin'
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              }     
            </Item>
            <Form.Item>
              {
                getFieldDecorator('password',{
                  rules: [{ 
                    validator: this.validatePwd
                  }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>         
        </section>
      </div>
    )
  }
}


const WrapLogin = Form.create()(Login);
export default WrapLogin
