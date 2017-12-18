import { delay } from 'redux-saga';

export default function*() {
  yield delay(1000);
  console.log('Hello Sagas');
}
