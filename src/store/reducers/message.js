import { SET_MESSAGE } from '../actions/action.types';

const initialState = {
  title:'',
  text:''
}

export default (state =initialState, action) => {
  switch(action.type){
    case SET_MESSAGE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}