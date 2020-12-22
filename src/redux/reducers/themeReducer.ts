import { SET_THEME } from '../actions/types'
import { setData } from '../../helpers/storage'

// TODO: Save the state into a persistent storage
const initialState = {
    theme: 'white' // white, dark
}

export default (state: object = initialState, action) => {
    switch (action.type) {
        case SET_THEME:
            // setData(SET_THEME, action.payload)
            return { ...state, theme: action.payload }
        default:
            return state
    }
}
