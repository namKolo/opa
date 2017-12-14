// @flow
import type { Action } from './action';

export type ExampleState = {
  status: boolean
};

export default function(
  state: ExampleState = {
    status: false
  },
  action: Action
) {
  if (action.type === 'EXAMPLE_ACTION') {
    return {
      status: true
    };
  }

  return state;
}
