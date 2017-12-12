import { delay } from 'redux-saga';

export function* helloSaga() {
  yield delay(1000);
  console.log('Hello Sagas');
}
