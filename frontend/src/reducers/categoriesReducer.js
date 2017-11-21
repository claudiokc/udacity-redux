import { LIST_CATEGORIES } from '../actions'

const categories = (state = {}, action) => {
    switch (action.type) {
        case LIST_CATEGORIES:
            return Object.assign({}, state, {
                categories: action.categories,
            })
        default:
            return state
    }
}

export default categories;