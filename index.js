import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'

import axios from 'axios'

import App from './src/App'
import { name as appName } from './app.json'

import storeConfig from './src/store/store.config'
import { PROJECT_ID } from './env'

axios.defaults.baseURL = `https://${PROJECT_ID}.firebaseio.com/`

const store = storeConfig()
const Redux = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => Redux)
