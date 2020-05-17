import { createSlice, createAction, createSelector } from "@reduxjs/toolkit";
import { all, put, takeEvery, delay } from "redux-saga/effects";
import { fetchWrapper } from "../../utils/fetch";

const prefix = "singIn";

//REDUCER
const singIn = createSlice({
  name: prefix,
  initialState: [],
  reducers: {
    setProfile: (state, action) => {
      //   state.push(...action.payload);
    },
  },
});

// export const sortedCurrencyTableData = createSelector(
//   [(state) => state.currencyTable],
//   (currencyTable) => R.sort(diff, currencyTable)
// );

const { actions, reducer } = singIn;

const { setProfile } = actions;
export const singInReducer = reducer;

export const updateSingInAction = createAction<object>(
  `${prefix}/UPDATE_SING_IN_ACTION`
);

//SAGA
function* updateSingInSaga(action: any) {
  const data = action.payload;

  let response = fetchWrapper("/singup", "POST", data);

  //   yield put(updateCurrencyFavorite(action.payload));
}

export function* watchSingIn() {
  yield all([takeEvery(updateSingInAction, updateSingInSaga)]);
}
