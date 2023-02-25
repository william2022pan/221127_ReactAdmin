import React, { Component } from 'react'
import { connect } from '../lib/react-redux'

import Counter from '../components/Counter'
import {increment,decrement, incrementAsync } from '../redux/actions'

const mapStateToProps = (state) => ({ count: state.count })

// const mapDispatchToProps = (dispatch) => ({
//   increment: (number) => dispatch(increment(number)),
//   decrement: (number) => dispatch(decrement(number))  
// })

const mapDispatchToProps = {increment, decrement}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)


// export default connect(
//   state => ({ count: state.count }),
//   {increment, decrement}
// )(Counter)
