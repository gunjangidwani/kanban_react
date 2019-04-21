import { combineReducers} from 'redux'
import { userReducer } from './user.reducer'
import { kanbanReducer } from './kanban.reducer'

export default combineReducers({
    userReducer,
    kanbanReducer
})