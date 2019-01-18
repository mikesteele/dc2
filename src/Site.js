import React from 'react';

class Site extends React.Component {
  render() {
    const site = 'youtube';
    return this.props.children(site);
  }
}

export default Site;
