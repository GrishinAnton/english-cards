import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { RootAction, RootState, Services } from 'typesafe-actions';

import epics from './rootEpic';
import reducers from './rootReducer';
import services from './rootService';

export type RootStateType = RootState;

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, Services>({
  dependencies: services,
});

function configureStore(initialState?: RootStateType) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(epicMiddleware)),
  );
}

export const store = configureStore();

// epicMiddleware.run(epics);
