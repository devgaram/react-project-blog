import { all } from 'redux-saga/effects';
import blog from './blog';
import auth from './auth';

export default function* root() {
  yield all([
    blog(),
    auth()
  ]);  
}