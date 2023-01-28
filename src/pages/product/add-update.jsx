import React, { Component } from 'react'
import { Card, Form, Input, Cascader, Upload, Button, Icon } from 'antd'
import PicturesWall from './picuture-wall'
import LinkButton from '../../components/link-button'
import {reqCategorys} from '../../api'

const { Item } = Form
const { TextArea } = Input

class ProductAddUpdate extends Component {

  state = {
    options: [],
  }

  constructor(props) {
    super(props)

    this.pw = React.createRef()
  }

  initOptions = async(categorys) => {
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false,
    }))

    const { isUpdate, product } = this
    const { pCategoryId, categoryId } = product
    if (isUpdate && pCategoryId !== '0') {
      const subCategorys = await this.getCategorys(pCategoryId)
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }))
      const targetOption = options.find(option => option.value===pCategoryId)
      targetOption.children = childOptions
    }

    this.setState({options})
  }

  getCategorys = async(parentId) => {
    const result = await reqCategorys(parentId)
    // debugger
    if (result.status === 0) {
      const categorys = result.data
      if (parentId === '0') {
        this.initOptions(categorys)
      } else {
        return categorys
      }    
    }
  }

  validatePrice = (rule, value, callback) => {
    console.log(value, typeof value)
    if (value*1 > 0) {
      callback()
    } else {
      callback('价格必须大于0')
    } 
  }

  loadData = async selectedOptions => {
    const targetOption = selectedOptions[0]
    console.log('targetOption: ',targetOption);
    targetOption.loading = true

    const subCategorys = await this.getCategorys(targetOption.value)
    console.log('subCategorys: ', subCategorys);
    targetOption.loading = false
    if (subCategorys && subCategorys.length > 0) {
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }))   
      targetOption.children = childOptions
    } else {
      targetOption.isLeaf = true
    }

    this.setState({
      options: [...this.state.options],
    })

    // load options lazily
    // setTimeout(() => {
    //   targetOption.loading = false
    //   targetOption.children = [
    //     {
    //       label: `${targetOption.label} Dynamic 1`,
    //       value: 'dynamic1',
    //       isLeaf: true
    //     },
    //     {
    //       label: `${targetOption.label} Dynamic 2`,
    //       value: 'dynamic2',
    //       isLeaf: true
    //     },
    //   ]
    //   this.setState({
    //     options: [...this.state.options],
    //   })
    // }, 1000)
  }

  submit = () => {
    this.props.form.validateFields((error, values) => {
      if (!error) {
        console.log('submit(): ', values);
        const imgs = this.pw.current.getImages()
        console.log('imgs',imgs);
        alert('发送ajax请求')
      }
    })
  }


  componentDidMount() {
    this.getCategorys('0')
  }

  UNSAFE_componentWillMount() {
    const product = this.props.location.state
    this.isUpdate = !!product
    this.product = product || {}
  }
  
  render() {

    const { isUpdate, product } = this
    const {pCategoryId, categoryId, imgs} = product 
    const categoryIds = []
    if (isUpdate) {
      if (pCategoryId === '0') {
        categoryIds.push(categoryId)
      } else {
        categoryIds.push(pCategoryId)    
        categoryIds.push(categoryId)
      }        
    }
    
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left" style={{fontSize: 20}} />
        </LinkButton>
        <span>{isUpdate ? '修改商品' : '添加商品'}</span>
      </span>
    )

    const formItemLayout = {
      labelCol: {span: 2},
      wrapperCol: {span: 8},
    }

    const { getFieldDecorator } = this.props.form

    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item label="商品名称">
            {
              getFieldDecorator('name', {
                initialValue: product.name,
                rules: [
                  {required: true, message: '必须输入商品名称'}
                ]
              })(<Input placeholder='请输入商品名称' />)
            }
          </Item>
          <Item label="商品描述">
          {
              getFieldDecorator('desc', {
                initialValue: product.desc,
                rules: [
                  {required: true, message: '必须输入商品描述'}
                ]
              })(<TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 6 }} />)
            }          
          </Item>
          <Item label="商品价格">
          {
              getFieldDecorator('price', {
                initialValue: product.price,
                rules: [
                  { required: true, message: '必须输入商品价格' },
                  {validator: this.validatePrice}
                ]
              })( <Input type='number' placeholder='请输入商品价格' addonAfter='元'/>)
            }            
          </Item>
          <Item label="商品分类">
          {
              getFieldDecorator('categoryIds', {
                initialValue: categoryIds,
                rules: [
                  { required: true, message: '必须指定商品分类' },
                ]
              })(
                <Cascader
                  placeholder='请指定商品分类'
                  options={this.state.options}
                  loadData={this.loadData}
                />
              )
            } 
           
          </Item>
          <Item label="商品图片">
            <PicturesWall ref={this.pw} imgs={imgs} />
          </Item>
          <Item label="商品详情">
            <div> 商品详情</div>
          </Item>
          <Item>
            <Button type='primary' onClick={this.submit}>提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)
