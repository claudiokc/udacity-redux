import * as types from './actionTypes';
import instance from './setupUrl';

export const loadCommentsSuccess = (comments) => {
    return { type: types.LOAD_COMMENTS_SUCCESS, comments}
}

export const createCommentSuccess = (comment) => {
    return { type: types.CREATE_COMMENT_SUCCESS, comment}
}
// /:category/posts
export const loadComments = (postId) => {
    return function(dispatch) {
        return instance.get('/posts/' + postId + '/comments').then(comments => {
            dispatch(loadCommentsSuccess(comments))
        }).catch(error => {
            throw(error);
        })
    }
}

export const createComment = (postId, comment) =>{
    return function(dispatch) {
        return instance.post('/comments', {
            id: Math.random().toString(36).substr(-8),
            timestamp:Date.now(),
            body: comment,
            author: 'somebody',
            parentId: postId
        }).then(comment => {
            dispatch(createCommentSuccess(comment))
        }).catch(error => {
            throw(error);
        })
    }
}

