import React, { Component } from 'react'

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native'

import { connect } from 'react-redux'

import Spinner from 'react-native-loading-spinner-overlay';

import { createUser } from '../store/actions/user'

const initialState = {
  name: '',
  email: '',
  password: ''
}

class Register extends Component {

  state = {
    ...initialState
  }

  componentDidUpdate = prevProps => {
    if( prevProps.isLoading && !this.props.isLoading ){
      this.setState({...initialState})
    }
  }

  saveUser = () => {
    this.props.onCreateUser(this.state)
  }

  backLogin = () => {
    this.props.navigation.navigate('Login')
  }

  render = () => {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.props.isLoading}
          animation='fade'
          overlayColor='rgba(0,0,0,0.8)'
          textContent={'Criando...'}
          textStyle={styles.spinnerTextStyle}
        />
        <TextInput
          style={styles.input}
          placeholder='Nome'
          autoFocus={true}
          value={this.state.name}
          onChangeText={name => this.setState({ name })} />
        <TextInput
          style={styles.input}
          keyboardType='email-address'
          placeholder='Email'
          value={this.state.email}
          onChangeText={email => this.setState({ email })} />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder='Senha'
          value={this.state.password}
          onChangeText={password => this.setState({ password })} />
        <TouchableOpacity onPress={this.saveUser} style={styles.buttom} >
          <Text style={styles.buttomText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.backLogin} style={styles.buttom} >
          <Text style={styles.buttomText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    isLoading: user.isCreatingUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateUser: user => dispatch(createUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

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
    paddingLeft: 15,
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