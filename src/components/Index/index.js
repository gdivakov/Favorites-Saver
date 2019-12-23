import React from 'react';

class Index extends React.Component {

  componentDidMount() {
    const {history} = this.props;

    history && history.push('/provider');
  }

  render() {
    return null;
  }
}

export default Index;