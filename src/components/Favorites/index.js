// @flow
import React from 'react';
import {Link} from 'react-router-dom';
import {withStyles, Typography, Button} from '@material-ui/core';
import Table, {MODES} from '../Table';

const Favorites = ({classes, entitiesActions, omdbData, wikiData}) => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography variant="h5">
          You can easily manage your favorites!
        </Typography>
        <Link to={"/provider"}>
          <Button variant="contained">To Provider</Button>
        </Link>
      </div>

      <Table
        omdb={omdbData}
        wiki={wikiData}
        mode={MODES.FAVORITES}
        entitiesActions={entitiesActions}
        className={classes.table}
      />
    </div>
  )
};

const styles = {
  container: {
    padding: 40,
    height: '100vh'
  },
  table: {
    marginTop: 60,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
}

export default withStyles(styles)(Favorites);