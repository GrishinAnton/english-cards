import { combineReducers } from '@reduxjs/toolkit'
import { userReducer } from './components/SignIn/ducks'

const rootReducers = combineReducers({
	userReducer,
})

export default rootReducers
