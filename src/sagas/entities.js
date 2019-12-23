// @flow
import { takeEvery, put } from 'redux-saga/effects';
import CONSTS from '../consts/';

function* toggleFavorite(action: {type: string, payload: {row: Object}}) {
  try {
    const {payload: {row}} = action;
    const provider = row._innerID.slice(-4); // ! Works only for current providers logic implementation
    yield put({
      type: CONSTS.UPDATE_DATA,
      payload: {id: row._innerID, provider},
    });

    yield put({
      type: CONSTS.UPDATE_FAVORITE,
      payload: {id: row._innerID, data: row},
    })

  } catch(e) {
    console.log(e);
    // Error handling
  }
}

export default function* fetchProviderData() {
  yield takeEvery(CONSTS.TOGGLE_FAVORITE, toggleFavorite)
};