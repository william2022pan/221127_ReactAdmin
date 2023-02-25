
export function createStore(reducer) {

  let state = reducer(undefined, { type: '@@redux/init' })
  const listeners = []

  function getState() {
    return state
  }

  function dispatch(action) {
    const newState = reducer(state, action)
    state = newState
    listeners.forEach(listener => listener())
  }

  function subscribe(listener) {
    listeners.push(listener)
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}


export function combineReducers(reducers) {
  return (state = {}, action) => {
    // const newState = Object.keys(reducers).reduce((preState, key) => {
    //   preState[key] = reducers[key](state[key], action)
    //   return preState
    // }, {})

    const totalState = {}
    Object.keys(reducers).forEach(key => {
      totalState[key] = reducers[key](state[key], action)
    })

    return totalState
  }
}


export function combineReducers2(reducers) {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((totalState, key) => {
      totalState[key] = reducers[key](state[key], action)
      return totalState
    }, {})
  }
}