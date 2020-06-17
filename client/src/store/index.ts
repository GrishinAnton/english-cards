import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { ActionType } from 'typesafe-actions';

import actions from './rootAction';
import epics from './rootEpic';
import reducers, { RootState } from './rootReducer';

export type RootStateType = RootState;
export type RootAction = ActionType<typeof actions>;

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>();

function configureStore(initialState?: RootStateType) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(epicMiddleware)),
  );
}

export const store = configureStore();

// epicMiddleware.run(epics);
