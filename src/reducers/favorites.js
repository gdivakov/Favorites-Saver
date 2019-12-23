// @flow
import CONSTS from '../consts/';

const initialState = {
  likedIds: [], // Saves only for one searhing session
  // @TODO: Comments could relate on likedIds and be placed here
};

const favoritesReducer = (state = initialState, { type, payload = {}}) => {

  switch (type) {
    case CONSTS.UPDATE_FAVORITE:
      const updatedIds = state.likedIds.slice();

      if (updatedIds.indexOf(payload.id) !== -1) {
        updatedIds.splice(updatedIds.indexOf(payload.id), 1);
      } else {
        updatedIds.push(payload.id);
      }

      return {
        ...state,
        likedIds: updatedIds,
      }
    case CONSTS.FETCH_SUCCESS:
      // Delete prev favs
      const likedIds = state.likedIds.slice().filter(id => id.indexOf(payload.provider) === -1);
      console.log(likedIds);
      return {
        ...state,
        likedIds,
      }
    default:
      return state;
  }
};

export default favoritesReducer;