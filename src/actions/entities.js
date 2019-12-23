// @flow
import CONSTS from '../consts';

export const toggleFavorite = (payload) => ({
  type: CONSTS.TOGGLE_FAVORITE,
  payload,
});