import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { filter, switchMap, map, catchError, tap, ignoreElements } from 'rxjs/operators';
import { RootAction, RootState, Services, isActionOf } from 'typesafe-actions';

import history from '../../utils/browserHistory'
import { Notification } from '../../utils'
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
          Notification('Рады видеть вас!');
        }),
        catchError(error => of(updateSignInAsync.failure(error))),
      )
    ),
  );

const signInErrorEpic: Epic<RootAction, RootAction, RootState, Services> = (action$) =>
  action$.pipe(
    filter(isActionOf(updateSignInAsync.failure)),
    tap(() => Notification('Извините, что-то пошло не так:(')),
    ignoreElements(),
  );

export default [signInEpic, signInErrorEpic];
