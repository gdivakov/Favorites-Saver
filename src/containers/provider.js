// @flow
import {connect} from 'react-redux';
import Provider from '../components/Provider/';
import * as apiActions from '../actions/api';
import * as entitiesActions from '../actions/entities';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return {
    omdbData: state.provider.omdb,
    wikiData: state.provider.wiki,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    apiActions: bindActionCreators({ ...apiActions }, dispatch),
    entitiesActions: bindActionCreators({...entitiesActions}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Provider);