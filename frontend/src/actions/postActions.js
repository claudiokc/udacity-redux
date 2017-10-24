import * as types from './actionTypes';
import instance from './setupUrl';

export const loadPostSuccess = (allPost) => {
    return { type: types.LOAD_POST_SUCCESS, allPost}
}

export const createPostSuccess = (createPost) => {
    return { type: types.CREATE_POST_SUCCESS, createPost}
}

export const loadAllpost = () => {
    return function(dispatch) {
        return instance.get('posts').then(post => {
            dispatch(loadPostSuccess(post))
        }).catch(error => {
            throw(error);
        })
    }
}

export const createPost = () => {
    return function(dispatch) {
        return instance.post('posts', {
            id: '11231231',
            timestamp: Date.now(),
            title: 'post 1',
            body: 'content',
            author: 'zho',
            category: 'redux'
        }).then(res => {
            dispatch(createPostSuccess(res))
        }).catch(error => {
            throw(error);
        })
    }
}