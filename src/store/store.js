import { createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducer'

export default function appStore(reducerState) {
    return createStore(
            rootReducer,
            reducerState,
            applyMiddleware(thunk)
    )
}