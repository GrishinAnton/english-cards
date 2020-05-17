import { all, fork } from "redux-saga/effects";
import { watchSingIn } from "./components/SingIn/ducks";

function* initSaga() {
  console.log("initSaga");
}

export function* rootSaga() {
  yield all([fork(initSaga), fork(watchSingIn)]);
}
