import { all, fork } from 'redux-saga/effects'
import { watchSingIn } from './components/SignIn/ducks'

// eslint-disable-next-line require-yield
function* initSaga() {
	console.log('initSaga')
}

export function* rootSaga() {
	yield all([fork(initSaga), fork(watchSingIn)])
}
