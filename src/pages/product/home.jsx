import React, { Component } from 'react'
import { Card, Select, Input, Button, Icon, Table } from 'antd'
import LinkButton from '../../components/link-button'

const Option = Select.Option

export default class ProductHome extends Component {

  state = {
    products: [
        {
          "status": 1,
          "imgs": [
              "image-1673345611050.png",
              "image-1673345613808.png"
          ],
          "_id": "63bd3aa5ef2fcb1f04b498b0",
          "name": "Xiaomi Buds 4",
          "desc": "半入耳舒适降噪\n舒适与静谧兼得\nHiFi音质，纯享天籁之音\n独立空间音频\n跨设备自由感受立体听感",
          "price": 239,
          "detail": "<p>基本参数</p>\n<p>产品形态：半入耳式真无线蓝牙耳机</p>\n<p>产品颜色：盐湖白 / 月影黑 / 旷野绿</p>\n<p>产品型号：M2224E1</p>\n",
          "pCategoryId": "63b4347115fc093878d0d7e4",
          "categoryId": "63b434ce15fc093878d0d7e8",
          "__v": 0
      },
      {
          "status": 1,
          "imgs": [
              "image-1673346020531.png",
              "image-1673346023346.jpg"
          ],
          "_id": "63bd3c43ef2fcb1f04b498b1",
          "name": "小米电视ES75",
          "desc": "多分区，画质轻旗舰",
          "price": 4999,
          "detail": "<p>星幕锐影多分区背光杜比视界ΔE≈2 原色屏MEMC 动态补偿金属全面屏远场语音控制2x12.5W四单元扬声器700nits高峰值亮度</p>\n",
          "pCategoryId": "63b4347915fc093878d0d7e5",
          "categoryId": "63bba06bdabec03670702f03",
          "__v": 0
      }
    ]
  } 

  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '￥' + price 
      },
      {
        width: 100,
        title: '状态',
        dataIndex: 'status',
        render: (status) => {
          return (
            <span>
              <Button type='primary'>下架</Button>
              <span>在售</span>
            </span>
          )
        } 
      },
      {
        width: 100,
        title: '操作',
        render: (product) => {
          return (
            <span>
              <LinkButton>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          )
        } 
      },
    ];
    
  }

  UNSAFE_componentWillMount() {
    this.initColumns()
  }

  render() {

   const {products} = this.state

    const title = (
      <span>
        <Select value='1' style={{width: 150}}>
          <Option value='1'>按名称搜索</Option>
          <Option value='2'>按描述搜索</Option>
        </Select>
        <Input placeholder='关键字' style={{width: 200, margin: '0 15px' }} />
        <Button type='primary'>搜索</Button>
      </span>
    )

    const extra = (
      <Button type='primary'>
        <Icon type='plus'/>
        添加商品
      </Button>
    )


    return (
      <Card title={title} extra={extra} >
        <Table
          bordered
          rowKey='_id'
          dataSource={products}
          columns={this.columns}
        />
      </Card>
    )
  }
}
