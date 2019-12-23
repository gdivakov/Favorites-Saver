// @flow
import React, {useState} from 'react';
import { Search as SearchIcon } from '@material-ui/icons';
import {
  withStyles,
  Input,
  Button,
} from '@material-ui/core';

const Search = ({classes, apiActions, provider}) => {
  const [value, changeValue] = useState("");

  const handleChange = e => changeValue(e.target.value);
  const getResults = () => {
    apiActions.fetchData({provider, query: value})
  };

  const handleKeyPressing = (e) => {
    if (e.key !== 'Enter') return;
    getResults();
  }

  return (
    <div className={classes.container}>
      <Input
        startAdornment={<SearchIcon />}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPressing}
      />
      <Button onClick={getResults}>Search</Button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    padding: '60px 0'
  }
}

export default withStyles(styles)(Search);