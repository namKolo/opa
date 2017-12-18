// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
import type { HOC } from 'recompose';
import type { Action as ActionCreators } from './store/action';

export type State = {};

export type Action = ActionCreators;
export type Dispatch = ReduxDispatch<Action>;
export type Store = ReduxStore<State, Action, Dispatch>;

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type RequestSetting = {
  method: RequestMethod,
  data: Object,
  locale: string
};

// eslint-disable-next-line
type HOCBase_<A, B, C: HOC<A, B>> = A;
export type HOCBase<C> = HOCBase_<*, *, C>;
