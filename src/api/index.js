
// import { message } from 'antd';
// import jsonp from 'jsonp';
import ajax from "./ajax";

// const BASE = "http://localhost:5000"
const BASE = ''

// export function reqLogin(username, password) {
//   return ajax('/login', { username, password }, 'POST')
// }

export const reqLogin = (username, password) => ajax(BASE+'/login', { username, password }, 'POST')

export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')

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

export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')

export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', { pageNum, pageSize }) 

export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType}) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName
})