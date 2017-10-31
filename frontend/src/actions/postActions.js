import * as types from './actionTypes';
import instance from './setupUrl';

export const loadPostSuccess = (allPost) => {
    return { type: types.LOAD_POST_SUCCESS, allPost}
}

export const createPostSuccess = (createPost) => {
    return { type: types.CREATE_POST_SUCCESS, createPost}
}

export const loadUniquePostSuccess = (loadUniquePost) => {
    return { type: types.LOAD_UNIQUE_POST, loadUniquePost}
}


export const updatePostSuccess = (postUpdated) => {
    return { type: types.UPDATE_POST_SUCCESS, postUpdated}
}

export const votePostSuccess = (postVote) => {
    return { type: types.VOTE_POST_SUCCESS, postVote}
}


export const loadAllpost = () => {
    return function(dispatch) {
        return instance.get('posts').then(post => {
            dispatch(loadPostSuccess(post.data))
        }).catch(error => {
            throw(error);
        })
    }
}

export const createPost = (item) => {
    return function(dispatch) {
        return instance.post('posts', {
            id: Math.random().toString(36).substr(-8),
            timestamp: Date.now(),
            title: item.Title,
            body: item.Body,
            author: item.Author,
            category: item.Category
        }).then(res => {
            dispatch(createPostSuccess(res))
        }).catch(error => {
            throw(error);
        })
    }
}

export const loadUniquePost = (post_id) => {
    return function(dispatch) {
        return instance.get('posts/' + post_id)
        .then(res => {
            dispatch(loadUniquePostSuccess(res))
        }).catch(error => {
            throw(error);
        })
    }
}

export const updatePost = (item) => {
    return function(dispatch) {
        return instance.put('posts/' + item.id, {
            title: item.title,
            body: item.body
        })
        .then(res => {
            dispatch(updatePostSuccess(res))
        }).catch(error => {
            throw(error);
        })
    }
}

export const votePost = (item) => {
    return function(dispatch) {
        return instance.post('posts/' + item.id, {
            option : item.vote
        })
        .then(res => {
            dispatch(updatePostSuccess(res))
        }).catch(error => {
            throw(error);
        })
    }
}