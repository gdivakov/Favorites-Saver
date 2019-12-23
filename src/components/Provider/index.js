// @flow
import React, {useState} from 'react';
import {Paper, Typography, withStyles, Button} from '@material-ui/core';
import Table from '../Table';
import Search from '../Search';
import Tabs, {TABS} from '../Tabs';
import {Link} from 'react-router-dom';

const Provider = ({classes, apiActions, entitiesActions, omdbData, wikiData}) => {

  const [provider, changeProvider] = useState(TABS[0].value);

  return (
    <>
      <Paper className={classes.container}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant="h5">
            Please select the provider
          </Typography>
          <Link to={"/favorites"}>
            <Button variant="contained">To Favorites</Button>
          </Link>
        </div>

        <Tabs
          onChange={changeProvider}
        />

        <Search
          provider={provider}
          apiActions={apiActions}
        />

        <Table
          provider={provider}
          omdb={omdbData}
          wiki={wikiData}
          entitiesActions={entitiesActions}
        />
      </Paper>
    </>
  );
}

const styles = {
  container: {
    padding: 40,
    margin: 20,
    minHeight: 800,
  },
}

export default withStyles(styles)(Provider);