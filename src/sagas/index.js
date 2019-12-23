// @flow
import { all } from 'redux-saga/effects';
import fetchProviderData from './provider';
import entities from './entities';

function* rootSaga(): any {
  yield all([
    fetchProviderData(),
    entities(),
  ]);
};

export default rootSaga;