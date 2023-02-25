import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import store from './redux/store'

console.log('state', store.getState());

ReactDOM.render(<App store={store} />, document.getElementById('root'))

store.subscribe(() => {
  console.log('state改变了，更新组件');
  ReactDOM.render(<App store={store} />, document.getElementById('root'))

})