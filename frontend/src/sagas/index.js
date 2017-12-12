import { all } from 'redux-saga';
import exampleSaga from './example';

export default function* root() {
  yield all([exampleSaga]);
}
