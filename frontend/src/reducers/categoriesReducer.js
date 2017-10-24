import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.categories, action) {
  switch (action.type) {
  case types.LOAD_CATEGORIES_SUCCESS:
    return action.categories;
  case types.LOAD_CATEGORIES_BY_POST_SUCCESS:
    return action.loadPostCategories;
  default:
    return state;
      
  }
}