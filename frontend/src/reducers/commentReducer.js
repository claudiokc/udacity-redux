import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.comments, action) {
  switch (action.type) {
  case types.CREATE_COMMENT_SUCCESS:
    return action.comment;
   case types.LOAD_COMMENTS_SUCCESS:
    return action.comments;
  default:
    return state;
      
  }
}