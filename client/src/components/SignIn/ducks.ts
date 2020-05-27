import { createSlice, createAction, createSelector } from '@reduxjs/toolkit'
import { all, put, call, takeEvery } from 'redux-saga/effects'

import { fetchWrapper, Notification } from '../../utils'
import history from '../../utils/browserHistory'

const prefix = 'singIn'

//REDUCER
const signIn = createSlice({
	name: prefix,
	initialState: {},
	reducers: {
		setProfile: (state, action) => action.payload
	},
})

const { actions, reducer } = signIn

const { setProfile } = actions
export const userReducer = reducer

export const updateSingInAction = createAction<object>(
	`${prefix}/UPDATE_SING_IN_ACTION`
)

//SELECTOR
export const userSelector = createSelector(
	[(state: any) => state.userReducer],
	(state) => state
);

//SAGA
function* updateSingInSaga(action: any) {
	try {
		const data = action.payload

		let { statusCode, user: userData } = yield call(fetchWrapper, "/login", "POST", data);

		if (statusCode === 200) {
			history.push('/dashboard')
			yield call(Notification, 'Рады видеть вас!')
			yield put(setProfile({user: userData}));
		}
	} catch (error) {
		yield call(Notification, 'Извините, что-то пошло не так:(')
	}
}

export function* watchSingIn() {
	yield all([takeEvery(updateSingInAction, updateSingInSaga)])
}
