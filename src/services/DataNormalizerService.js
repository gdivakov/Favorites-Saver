// @flow
import {PROVIDERS} from '../config/configApp';

export const normalizeData = (data, provider) => {
  if (provider === PROVIDERS.WIKIPEDIA) {
    return data.query.allpages.map((entity, idx) => ({...entity, isFavorite: false, _innerID: `${idx+1}wiki`}));
  }
  if (provider === PROVIDERS.OMDB) {
    return data.Search.map((entity, idx) => ({...entity, isFavorite: false, _innerID: `${idx+1}omdb`}));
  }
}