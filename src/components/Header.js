import React, { Component } from 'react'

import { connect } from 'react-redux'

import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity
} from 'react-native'

import { Gravatar } from 'react-native-gravatar'

import icon from './../../assets/imgs/icon.png'

class Header extends Component {

  render = () => {
    const name = this.props.name || 'Anonymous'
    const gravatar = this.props.email ?
      <Gravatar options={{ email: this.props.email, secure: true }} style={styles.avatar} /> :
      null

    return (
      <View style={styles.container} >
        <View style={styles.rowContainer} >
          <Image source={icon} style={styles.image} />
          <Text style={styles.title}>Instagran</Text>
        </View>
        <TouchableOpacity
          style={{ alignItems: 'center', justifyContent: 'center' }}
          onPress={() => this.props.navigation.navigate('Profile')} >
          <View style={styles.userContainer}>
            <Text style={styles.user}>{name}</Text>
            {gravatar}
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    name: user.name,
    email: user.email
  }
}

export default connect(mapStateToProps)(Header)

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#BBB',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  },
  title: {
    color: '#000',
    fontFamily: 'shelter',
    height: 30,
    fontSize: 28
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10
  },
  user: {
    fontSize: 10,
    color: '#888'
  }
})