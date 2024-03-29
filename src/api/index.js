
// import { message } from 'antd';
// import jsonp from 'jsonp';
import ajax from "./ajax";

// const BASE = "http://localhost:5000"
const BASE = ''

// export function reqLogin(username, password) {
//   return ajax('/login', { username, password }, 'POST')
// }

export const reqLogin = (username, password) => ajax(BASE+'/login', { username, password }, 'POST')

export const reqWeather = () => {
  return new Promise((resolve, reject) => {
    // const url =`https://api.map.baidu.com/weather/v1/?district_id=310115&data_type=all&ak=vmMWBuYjf8qY7Au28ciOODxH9FZkyqId`
    // jsonp(url, {}, (err, data) => {
    //   console.log('jsonp()', err, data);
    //   if (!err && data.status === 0) {
    //     const { wd_day, wc_day, text_day } = data.result.forecasts[0]
    //     resolve({ 
    //       dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/qing.png',
    //       weather: '晴'
    //      })
    //   } else {
    //     message.error('获取天气信息失败!')
    //   }
    // })  
    
      resolve({ 
        dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/qing.png',
        weather: '晴'
      })
  })
}

export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', { parentId })

export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')

export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', {categoryId})

export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')

export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', { pageNum, pageSize }) 

export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', {productId, status}, 'POST')

export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType}) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName
})

export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete', { name }, 'POST')

export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST')

// export const reqUpdateProduct = (product) => ajax(BASE + '/manage/product/update', product, 'POST')

export const reqRoles = () => ajax(BASE + '/manage/role/list')

export const reqAddRole = (roleName) => ajax(BASE + '/manage/role/add', { roleName }, 'POST')

export const reqUpdateRole = (role) => ajax(BASE + '/manage/role/update', role, 'POST')

export const reqUsers = () => ajax(BASE + '/manage/user/list')

export const reqDeleteUser = (userId) => ajax(BASE + '/manage/user/delete', { userId }, 'POST')

export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')

export const reqAddOrUpdateUser = (user) => ajax(BASE + '/manage/user/'+(user._id ? 'update' : 'add'), user, 'POST')