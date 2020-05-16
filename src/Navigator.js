import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createSwitchNavigator } from '@react-navigation/compat'
import { createStackNavigator } from '@react-navigation/stack';
import { createCompatNavigatorFactory } from '@react-navigation/compat';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Icon from 'react-native-vector-icons/FontAwesome'

import Feed from './screens/Feed'
import AddPhoto from './screens/AddPhoto'
import Profile from './screens/Profile'
import Login from './screens/Login'
import Register from './screens/Register'

const authRouter = createCompatNavigatorFactory(createStackNavigator)({
  Login: { screen: Login, navigationOptions: { title: 'Login' } },
  Register: { screen: Register, navigationOptions: { title: 'Registro' } }
},{
  initialRouteName: 'Login'
})

const loginOrProfileRouter = createSwitchNavigator({
  Profile: Profile,
  Auth: authRouter
}, {
  initialRouteName: 'Auth'
})

const Tab = createBottomTabNavigator()

export default () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Feed'
        tabBarOptions={{
          showLabel: false
        }} >
        <Tab.Screen
          name='Feed'
          component={Feed}
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Icon name='home' size={size} color={color} />,
          }} />
        <Tab.Screen
          name='AddPhoto'
          component={AddPhoto}
          options={{
            title: 'Add Picture',
            tabBarIcon: ({ color, size }) => <Icon name='camera' size={size} color={color} />,
          }} />
        <Tab.Screen
          name='Profile'
          component={loginOrProfileRouter}
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => <Icon name='user' size={size} color={color} />,
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}