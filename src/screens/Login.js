import React, { Component } from 'react'

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'

import { connect } from 'react-redux'

import Spinner from 'react-native-loading-spinner-overlay';

import { login } from '../store/actions/user'

const initialState = {
  name: '',
  email: '',
  password: ''
}

class Login extends Component {

  state = {
    ...initialState
  }

  componentDidUpdate = prevProps => {
    if (prevProps.isLoading && !this.props.isLoading) {
      
      if( this.props.isNotFound){
        return
      }

      this.setState({
        ...initialState
      })
      this.props.navigation.navigate('Profile')
    }
  }

  login = () => {
    this.props.onLogin({ ...this.state })
  }

  render = () => {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.props.isLoading}
          animation='fade'
          overlayColor='rgba(0,0,0,0.8)'
          textContent={'Logando...'}
          textStyle={styles.spinnerTextStyle}
        />
        <TextInput
          placeholder='Email'
          style={styles.input}
          autoFocus={true}
          keyboardType='email-address'
          value={this.state.email}
          onChangeText={email => this.setState({ email })} />
        <TextInput
          placeholder='Senha'
          style={styles.input}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={password => this.setState({ password })} />
        <TouchableOpacity onPress={this.login} style={styles.buttom} >
          <Text style={styles.buttomText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Register') }} style={styles.buttom} >
          <Text style={styles.buttomText}>Criar nova Conta</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    isLoading: user.isLogging,
    isNotFound: user.isNotFound
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: user => dispatch(login(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    marginTop: 20,
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#EEE'
  },
  buttom: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#4286f4'
  },
  buttomText: {
    fontSize: 20,
    color: '#FFF'
  },
  spinnerTextStyle: {
    color: '#FFF'
  }
})