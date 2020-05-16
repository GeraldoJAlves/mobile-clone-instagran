import React, { Component } from 'react'

import { Alert } from 'react-native'

import { connect } from 'react-redux'

import Navigator from './Navigator'
import { setMessage } from './store/actions/message'

class App extends Component {

  componentDidUpdate = () => {
    if (this.props.title && this.props.text) {
      Alert.alert(this.props.title, this.props.text)
      this.props.clearMessage()
    }
  }

  render = () => {
    return (
      <Navigator />
    )
  }
}

const mapStateToProps = ({ message }) => {
  return {
    ...message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearMessage: () => dispatch(setMessage({ title: '', text: '' }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)