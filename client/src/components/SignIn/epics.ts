import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { filter, switchMap, map, catchError, tap } from 'rxjs/operators';
import { RootAction, RootState, Services, isActionOf } from 'typesafe-actions';

import history from '../../utils/browserHistory'
import { updateSignInAsync } from './actions';

const signInEpic: Epic<RootAction, RootAction, RootState, Services> = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(updateSignInAsync.request)),
    switchMap(action =>
      from(api.signIn.update(action.payload)).pipe(
        map(updateSignInAsync.success),
        tap(action => {
          localStorage.setItem('token', action.payload.token);
          history.push('/dashboard');
        }),
        catchError(error => of(updateSignInAsync.failure(error))),
      )
    ),
  );

export default [signInEpic];
