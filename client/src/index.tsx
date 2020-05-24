import React from 'react'
import ReactDOM from 'react-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { ToastContainer } from "react-toastify";

import rootReducers from './rootReducer'
import { rootSaga } from './rootSaga'
import App from './App'

//style
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-toastify/dist/ReactToastify.css";
import './app.scss'

const sagaMiddleWare = createSagaMiddleware()

const store = configureStore({
	reducer: rootReducers,
	middleware: [sagaMiddleWare],
})

sagaMiddleWare.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>,
  document.getElementById("root")
);
