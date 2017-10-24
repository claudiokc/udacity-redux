import {combineReducers} from 'redux';
import categories from './categoriesReducer';
import posts from './postReducer';

const rootReducer = combineReducers({
    categories,
    posts
});

export default rootReducer;