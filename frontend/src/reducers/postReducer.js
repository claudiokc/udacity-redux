import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.post, action) {
  switch (action.type) {
  case types.LOAD_POST_SUCCESS:
    return action.allPost;
  case types.CREATE_POST_SUCCESS:
    return [
      ...state,
      Object.assign({}, action.createpost)
    ];
  default:
    return state;
      
  }
}