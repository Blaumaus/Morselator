import { SET_THEME } from '../actions/types'

const initialState = {
    theme: 'white' // white, dark
}

export default (state: object = initialState, action) => {
    switch (action.type) {
        case SET_THEME:
            return { ...state, theme: action.payload }
        default:
            return state
    }
}
