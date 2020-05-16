import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOADING_USER,
  USER_LOADED,
  CREATING_USER,
  USER_CREATED,
  USER_NOT_FOUND
} from '../actions/action.types'

const initialState = {
  name: null,
  email: null,
  isLogging: false,
  isCreatingUser: false,
  isNotFound: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_NOT_FOUND:
      return {
        ...state,
        isLogging: false,
        isNotFound: true
      }
    case USER_LOADED:
      return {
        ...state,
        isLogging: false
      }
    case USER_CREATED:
      return {
        ...state,
        isCreatingUser: false
      }
    case CREATING_USER:
      return {
        ...state,
        isCreatingUser: true
      }
    case LOADING_USER:
      return {
        ...state,
        isNotFound: false,
        isLogging: true
      }
    case USER_LOGGED_IN:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email
      }
    case USER_LOGGED_OUT:
      return {
        ...state,
        ...initialState
      }
    default:
      return state
  }
}

export default reducer