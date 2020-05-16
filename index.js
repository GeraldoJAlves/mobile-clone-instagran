import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'

import axios from 'axios'

import App from './src/App'
import { name as appName } from './app.json'

import storeConfig from './src/store/store.config'

axios.defaults.baseURL = 'https://insta-c699b.firebaseio.com/'

const store = storeConfig()
const Redux = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => Redux)
