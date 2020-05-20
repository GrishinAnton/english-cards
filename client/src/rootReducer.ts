import { combineReducers } from '@reduxjs/toolkit'
import { singInReducer } from './components/SignIn/ducks'

const rootReducers = combineReducers({
	singInReducer,
})

export default rootReducers
