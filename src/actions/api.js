// @flow
import CONSTS from '../consts';

export const fetchData = (payload) => ({
  type: CONSTS.FETCH_REQUEST,
  payload
});