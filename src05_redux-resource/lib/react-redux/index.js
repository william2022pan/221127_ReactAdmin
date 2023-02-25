import React from 'react'
import PropTypes from 'prop-types'


export class Provider extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext() {
    return {
      store: this.props.store
    }
  }

  render() {
    return this.props.children
  }
}


export function connect(mapStateToProps, mapDispatchToProps) {
  return (UIComponent) => {
    return class ContainerComponent extends React.Component {

      static contextTypes = {
        store: PropTypes.object
      }

      constructor(props, context) {
        super(props)
        console.log('ContainerComponent constructor()', context.store);

        const { store } = context
        const stateProps = mapStateToProps(store.getState())
        this.state = {...stateProps}

        let dispatchProps
        if (typeof mapDispatchToProps === 'function') {
          dispatchProps = mapDispatchToProps(store.dispatch)         
        } else {
          dispatchProps = Object.keys(mapDispatchToProps).reduce((pre, key) => {
            const actionCreator = mapDispatchToProps[key]
            pre[key] = (...args) => store.dispatch(actionCreator(...args))
            return pre
          }, {})
        }      
        
        this.dispatchProps = dispatchProps
        
        store.subscribe(() => {
          this.setState({...mapStateToProps(store.getState())})
        })

      }

      render() {
        return <UIComponent {...this.state} {...this.dispatchProps} />
      }
    }
  }
}