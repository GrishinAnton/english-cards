import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { filter, switchMap, map, catchError, tap, ignoreElements } from 'rxjs/operators';
import { RootAction, RootState, Services, isActionOf } from 'typesafe-actions';

import { getProfileAsync } from './actions';

const getProfileEpic: Epic<RootAction, RootAction, RootState, Services> = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(getProfileAsync.request)),
    switchMap(action =>
      from(api.profile.get()).pipe(
        map(getProfileAsync.success),
        catchError(error => of(getProfileAsync.failure(error))),
      )
    ),
  );

export default [getProfileEpic];
