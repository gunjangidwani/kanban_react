import { GET_KANBAN } from '../constant'
import { UPDATE_KANBAN, CREATE_KANBAN } from '../constant'
const initalState = {}

export const kanbanReducer = (state = initalState, action) => {
    switch(action.type) {
        case GET_KANBAN.REQUEST:
            return action.payload
        case GET_KANBAN.SUCCESS:
            return action.payload
        case UPDATE_KANBAN.REQUEST:
            return action.payload
        case UPDATE_KANBAN.SUCCESS:
            return action.payload
        case CREATE_KANBAN.SUCCESS:
            // console.log(state)
            // console.log(action)
            return {
                state: action.payload.state,
                value: state.value.push(action.payload.value)
            }
        default:
            return state
    }
}