// @flow
import CONSTS from '../consts/';

const initialState = {
  omdb: [],
  wiki: [],
};

const favoritesReducer = (state = initialState, { type, payload = {}}) => {
  switch (type) {
    case CONSTS.FETCH_SUCCESS:
      return {
        ...state,
        [payload.provider]: [
          ...payload.data,
        ],
      }
    case CONSTS.UPDATE_DATA:
      const {id, provider} = payload;
      const providerData = state[provider].slice();

      const toggledEntityIdx = providerData.findIndex(entity => entity._innerID === id);
      const entity = providerData[toggledEntityIdx];
      providerData.splice(toggledEntityIdx, 1, {...entity, isFavorite: !entity.isFavorite});
      return {
        ...state,
        [provider]: [
          ...providerData,
        ]
      }
    default:
      return state;
  }
};

export default favoritesReducer;