import { LOGIN } from '../constant'
import { REGISTER } from '../constant'

const initalState = {}

export const userReducer = (state = initalState, action) => {
    switch(action.type) {
        case LOGIN.REQUEST:
            return action.payload
        case LOGIN.SUCCESS:
            return action.payload
        case REGISTER.REQUEST:
            return action.payload
        case REGISTER.SUCCESS:
            return action.payload
        default:
            return state
    }
}