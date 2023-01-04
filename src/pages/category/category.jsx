import React, { Component } from 'react'
import { Card, Button, Icon, Table, message, Modal } from 'antd'
import LinkButton from '../../components/link-button';
import { reqCategorys } from '../../api';
import AddForm from './add-form'
import UpdateForm from './update-form'

export default class Category extends Component {
  
  state = {
    loading: false,
    categorys: [],
    subCategorys: [],
    parentId: '0',
    parentName: '',
    showStatus: 0
  }

  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name'
      },
      {
        title: '操作',
        width: 300,
        render: (category) => (
          <span>
            <LinkButton onClick={this.showUpdate}>修改分类</LinkButton>
            {this.state.parentId === '0' ? <LinkButton onClick={()=>this.showSubCategorys(category)}>查看子分类</LinkButton> : null}          
          </span>
        )
      }
    ];
  }

  getCategorys = async () => {
    this.setState({ loading: true })
    const {parentId} = this.state
    const result = await reqCategorys(parentId)
    this.setState({loading: false})
    if (result.status === 0) {
      const categorys = result.data
      if (parentId === '0') {
        this.setState({categorys})
      } else {
        this.setState({subCategorys: categorys})
      }
      
    } else {
      message.error('获取分类列表失败')
    }

  }

  showSubCategorys = (category) => {
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => {
      console.log('parentId: ', this.state.parentId);
      this.getCategorys()
    })   
  }

  showCategorys = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []   
    })

  }

  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
  }

  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  addCategory = () => {
    console.log('addCategory()');

  }

  showUpdate = () => {
    this.setState({
      showStatus: 2
    })
  }

  updateCategory = () => {
    console.log('updateCategory()');

  }

  UNSAFE_componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getCategorys()
  }

  render() {

    const { categorys, subCategorys, parentId, parentName, loading, showStatus } = this.state

    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategorys} >一级分类列表</LinkButton>
        <Icon type="arrow-right" style={{marginRight: 5}} />
        <span>{parentName}</span>
      </span>
    )
    const extra = (
      <Button type='primary' onClick={this.showAdd}>
        <Icon type='plus' />
        添加
      </Button>
    )

    return (
      <Card title={title} extra={extra} >
        <Table
          bordered
          rowKey='_id'
          loading = {loading}
          dataSource={parentId === '0' ? categorys : subCategorys}
          columns={this.columns}
          pagination={{ defaultPageSize: 2, showQuickJumper: true }} />
        
        <Modal
          title="添加分类"
          visible={showStatus===1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm/>
        </Modal>

        <Modal
          title="更新分类"
          visible={showStatus===2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm/>
        </Modal>
    </Card>
    )
  }
}
