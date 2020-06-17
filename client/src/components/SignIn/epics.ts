import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { filter, switchMap, map, catchError, mergeMap, exhaustMap } from 'rxjs/operators';
import { RootAction, RootState, Services, isActionOf } from 'typesafe-actions';

import { updateSignInAsync } from './actions';

const signInEpic: Epic<RootAction, RootAction, RootState, Services> = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(updateSignInAsync.request)),
    exhaustMap(action =>
      from(api.signIn.update(action.payload)).pipe(
        map(updateSignInAsync.success),
        catchError(error => of(updateSignInAsync.failure(error))),
      )
    ),
  );

export default [signInEpic];
