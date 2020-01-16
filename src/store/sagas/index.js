import { all } from 'redux-saga/effects';
import blog from './blog';

export default function* root() {
  yield all([
    blog()
  ]);  
}