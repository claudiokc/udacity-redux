import * as types from './actionTypes';
import instance from './setupUrl';

export const loadCategoriesSuccess = (categories) => {
    return { type: types.LOAD_CATEGORIES_SUCCESS, categories}
}

export const loadPostCategoriesSuccess = (loadPostCategories) => {
    return { type: types.LOAD_CATEGORIES_BY_POST_SUCCESS, loadPostCategories}
}
// /:category/posts
export const loadCategories = () => {
    return function(dispatch) {
        return instance.get('categories').then(categories => {
            dispatch(loadCategoriesSuccess(categories))
        }).catch(error => {
            throw(error);
        })
    }
}

export const loadPostCategory = (postCategory) =>{
    return function(dispatch) {
        return instance.get(postCategory + '/posts').then(categories => {
            dispatch(loadPostCategoriesSuccess(categories))
        }).catch(error => {
            throw(error);
        })
    }
}

