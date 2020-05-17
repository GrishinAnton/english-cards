import { combineReducers } from "@reduxjs/toolkit";
import { singInReducer } from "./components/SingIn/ducks";

const rootReducers = combineReducers({
  singInReducer,
});

export default rootReducers;
