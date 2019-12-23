// @flow
import React, {useState} from 'react';
import {
  withStyles,
  Tabs,
  Tab,
} from '@material-ui/core';

export const TABS = [
  {
    label: 'Wiki',
    value: 'wiki',
  },
  {
    label: 'OMDB',
    value: 'omdb',
  },
];


const ProviderTabs = ({classes, onChange}) => {

  const [value, setValue] = useState(TABS[0].value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <Tabs
      className={classes.tabs}
      value={value}
      onChange={handleChange}
      variant="fullWidth"
      indicatorColor="secondary"
      textColor="secondary"
    >
      {TABS.map(tab => (
        <Tab label={tab.label} value={tab.value} key={tab.value}/>
      ))}

    </Tabs>
  );
};

const styles = {
  tabs: {
    width: '50%',
    margin: '20px auto',
  },
}

export default withStyles(styles)(ProviderTabs);