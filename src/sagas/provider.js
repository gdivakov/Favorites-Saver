// @flow
import { takeLatest, call, put } from 'redux-saga/effects';
import CONSTS from '../consts/';
import {PROVIDERS, URLS} from '../config/configApp';
import ApiService from '../services/ApiService';
import {normalizeData} from '../services/DataNormalizerService';

function* fetchData(action: {type: string, payload: {query: string, provider: string}}) {
  const {payload: {provider, query}} = action;
  //@TODO: Display message if search returned no results
  try {
    const url = getUrl(provider, query);
    if (!url) {
      throw Error('Invalid url')
      // Error handling
    }

    const data = yield call(ApiService.fetch, url, provider);

    yield put({
      type: CONSTS.FETCH_SUCCESS,
      payload: {provider, data: normalizeData(data, provider)}
    });

    //@NOTE: OMDB returns only 10 entries/request (50 could be achived by calling API 5 times in a row)
  } catch (e) {
    console.log(e);
    // Error handling
  }
}

//@TODO: move to ..\utils
const getUrl = (provider, query) => {
  if (provider === PROVIDERS.WIKIPEDIA) return `${URLS.API_PROVIDER_WIKIPEDIA}?origin=*&action=query&format=json&list=allpages&apfrom=${query}&aplimit=50`;
  if (provider === PROVIDERS.OMDB) return `${URLS.API_PROVIDER_OMDB}?apikey=ce3a0c28&s=${query}`;
}

export default function* fetchProviderData() {
  yield takeLatest(CONSTS.FETCH_REQUEST, fetchData)
};