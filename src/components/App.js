//@flow
import React from 'react';
import { Provider } from 'react-redux';
import store from '../config/configStore';
import AppRouter from '../router';

class App extends React.Component {

  componentDidCatch(error) {
    // some error handling
  }

  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App;