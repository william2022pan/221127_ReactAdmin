import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd';

import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import './index.less'

const { SubMenu } = Menu;

class LeftNav extends Component {

  hasAuth = (item) => {
    const {key, isPublic} = item 
    const menus = memoryUtils.user.role.menus
    const username = memoryUtils.user.username
    if (username === 'admin' || isPublic || menus.indexOf(key)!==-1) {
      return true
    } else if (item.children) {
      return !!item.children.find(child => menus.indexOf(child.key)!==-1)
    }

    return false
  }

  getMenuNodes_map = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
           {this.getMenuNodes_map(item.children)}
          </SubMenu>
        )
      }

    })
  }


  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname;
    return menuList.reduce((pre, item) => {
      if (this.hasAuth(item)) {
        if (!item.children) {
          pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
          ))
        } else {
  
          const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
          if (cItem) {
            this.openKey = item.key
          }
         
          pre.push((
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
           {this.getMenuNodes(item.children)}
          </SubMenu>
          ))
        }
      }

      return pre
    } ,[])
  }

  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {
    // debugger
    let path = this.props.location.pathname;
    if (path.indexOf('/product') === 0) {
      path = '/product'
    }

    const openKey = this.openKey

    return (
      <div className='left-nav'>
        <Link to="/" className='left-nav-header'>
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
        >
          {/* <Menu.Item key="/home">
            <Link to='/home'>
              <Icon type="pie-chart" />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="/category">
              <Link to='/category'>
                <Icon type="mail" />
                <span>品类管理</span>
              </Link>          
            </Menu.Item>
            <Menu.Item key="/product">
              <Link to='/product'>
                <Icon type="mail" />
                <span>商品管理</span>
              </Link>     
            </Menu.Item>
          </SubMenu> */}

          {
            this.menuNodes
          }
          
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)
