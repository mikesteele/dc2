import React from 'react';

class Site extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      site: null
    };
  }

  componentDidMount() {
    const currentURL = window.location.href;
    if (currentURL.includes('netflix.com')) {
      this.setState({
        site: 'netflix'
      });
    } else if (currentURL.includes('youtube.com')) {
      this.setState({
        site: 'youtube'
      });
    } else if (currentURL.includes('edx.org')) {
      this.setState({
        site: 'edx'
      });
    }
  }

  render() {
    return this.props.children(this.state.site);
  }
}

export default Site;
