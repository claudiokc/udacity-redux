import {
    LIST_POSTS,
    GET_POST,
    ADD_POST,
    DELETE_POST,
    EDIT_POST,
    VOTE_POST,
    COMMENT_COUNT
} from '../actions'

const posts = (state = {}, action) => {
    switch (action.type) {
        case LIST_POSTS:
            return Object.assign({}, state, {
                posts: action.posts,
                selectedIndex: -1
            })
        case GET_POST:
            return Object.assign({}, state, {
                selectedIndex: (typeof state.posts !== 'undefined') ? state.posts.findIndex(p => p.id === action.postId) : -1
            })
        case ADD_POST:
            return Object.assign({}, state, {
                posts: [...state.posts, action.post]
            })
        case DELETE_POST:
            return Object.assign({}, state, {
                posts: state.posts.filter(p => p.id !== action.post.id),
                selectedIndex: -1
            })
        case EDIT_POST:
            return Object.assign({}, state, {
                posts: state.posts.map((post) => {
                    if (post.id === action.post.id) {
                        return { ...action.post, commentCount: post.commentCount }
                    }
                    return post
                })
            })
        case COMMENT_COUNT:
            return Object.assign({}, state, {
                posts: state.posts.map((post) => {
                    if (post.id === action.id) {
                        return {
                            ...post, commentCount:
                            (action.actionType === 'add' ? post.commentCount + 1 :
                                (action.actionType === 'del' ? post.commentCount - 1 : action.commentCount))
                        }
                    }
                    return post
                })
            })
        case VOTE_POST:
            return Object.assign({}, state, {
                posts: state.posts.map((post) => {
                    if (post.id === action.id) {
                        return Object.assign({}, post, {
                            voteScore: action.vote === 'upVote' ? post.voteScore + 1 : post.voteScore - 1
                        })
                    }
                    return post
                })
            })
        default:
            return state
    }
}

export default posts;