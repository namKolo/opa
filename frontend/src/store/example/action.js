// @flow
export type TriggerExampleAction = {|
  type: 'EXAMPLE_ACTION'
|};

export const triggerExampleAction = (): TriggerExampleAction => ({
  type: 'EXAMPLE_ACTION'
});

export type Action = TriggerExampleAction;
