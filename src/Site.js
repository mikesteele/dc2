import React from 'react';

class Site extends React.Component {
  render() {
    const site = 'netflix';
    return this.props.children(site);
  }
}

export default Site;
