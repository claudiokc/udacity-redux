import {
    LIST_COMMENTS,
    ADD_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    VOTE_COMMENT
} from '../actions'

const comments = (state = {}, action) => {
    switch (action.type) {
        case LIST_COMMENTS:
            return Object.assign({}, state, {
                comments: action.comments,
            })
        case ADD_COMMENT:
            return Object.assign({}, state, {
                comments: state.comments ? [...state.comments, action.comment] : [action.comment]
            })
        case DELETE_COMMENT:
            return Object.assign({}, state, {
                comments: state.comments.filter(c => c.id !== action.comment.id)
            })
        case EDIT_COMMENT:
            return Object.assign({}, state, {
                comments: state.comments.map((comment) => {
                    if (comment.id === action.comment.id) {
                        return { ...action.comment }
                    }
                    return comment
                })
            })
        case VOTE_COMMENT:
            return Object.assign({}, state, {
                comments: state.comments.map((comment) => {
                    if (comment.id === action.id) {
                        return Object.assign({}, comment, {
                            voteScore: action.vote === 'upVote' ? comment.voteScore + 1 : comment.voteScore - 1
                        })
                    }
                    return comment
                })
            })
        default:
            return state
    }
}

export default comments;