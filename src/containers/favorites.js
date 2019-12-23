// @flow
import {connect} from 'react-redux';
import Favorites from '../components/Favorites/';
import * as entitiesActions from '../actions/entities';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  const wikiData = state.provider.wiki;
  const omdbData = state.provider.omdb;
  const favorites = state.favorites.likedIds;

  return {
    omdbData: omdbData.filter(row => favorites.includes(row._innerID)),
    wikiData: wikiData.filter(row => favorites.includes(row._innerID)),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    entitiesActions: bindActionCreators({...entitiesActions}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);