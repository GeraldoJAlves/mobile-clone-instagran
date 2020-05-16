import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_LOADED,
  LOADING_USER,
  CREATING_USER,
  USER_CREATED,
  USER_NOT_FOUND
} from './action.types'

import axios from 'axios'

import { setMessage } from './message'
import { API_KEY } from '../../../env'

const authBaseUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'


export const createUser = user => {
  return async dispatch => {
    try {
      dispatch(creatingUser())
      const resUser = await axios.post(`${authBaseUrl}/signupNewUser?key=${API_KEY}`, {
        email: user.email,
        password: user.password,
        returnSecureToken: true
      })

      if (resUser.data.localId) {
        await axios.put(`/users/${resUser.data.localId}.json`, {
          name: user.name
        })
      }

      dispatch(userCreated())
      dispatch(setMessage({
        title: 'Sucesso',
        text: 'Usuario criado com sucesso!'
      }))
    } catch (err) {

      dispatch(userCreated())
      dispatch(setMessage({
        title: 'Atenção',
        text: 'Erro ao criar usuário!'
      }))
      console.log('server', err)
    }
  }
}

export const login = user => {
  return async dispatch => {
    try {
      dispatch(loadingUser())

      const resVerifyPassword = await axios.post(`${authBaseUrl}/verifyPassword?key=${API_KEY}`, {
        email: user.email,
        password: user.password,
        returnSecureToken: true
      })

      if (resVerifyPassword.data.localId) {
        const resUserData = await axios.get(`/users/${resVerifyPassword.data.localId}.json`)

        dispatch(userLogged({
          userId: resVerifyPassword.data.localId,
          email: user.email,
          name: resUserData.data.name
        }))
      }

      dispatch(userLoaded())

    } catch (err) {

      dispatch(userNotFound())

      dispatch(setMessage({
        title: 'Atenção',
        text: 'Usuario não econtrado!'
      }))
      console.log('erro login', err)
    }
  }
}

export const loadingUser = () => {
  return {
    type: LOADING_USER
  }
}

export const userLoaded = () => {
  return {
    type: USER_LOADED
  }
}

export const userNotFound = () => {
  return {
    type: USER_NOT_FOUND
  }
}

export const creatingUser = () => {
  return {
    type: CREATING_USER
  }
}

export const userCreated = () => {
  return {
    type: USER_CREATED
  }
}

export const userLogged = user => {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export const logout = () => {
  return {
    type: USER_LOGGED_OUT
  }
}