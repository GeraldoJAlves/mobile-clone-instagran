import { SET_MESSAGE } from './action.types'

export const setMessage = message => {
  return {
    type: SET_MESSAGE,
    payload: message
  }
}