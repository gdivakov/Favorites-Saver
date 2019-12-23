import {combineReducers} from 'redux';
import favorites from './favorites';
import provider from './provider';

export default combineReducers({
  favorites,
  provider,
});