import React from 'react';

class PopupMessageHandler extends React.Component {
  componentDidMount() {
    //chrome.onMessage(this)
  }

  componentWillUnmount() {
    //chrome.onMessage(this)
  }

  render() {
    //const settings = this.state.settings;
    return this.props.children({
      isOn: true,
      secondSubtitleLanguage: 'en' // TODO
    });
  }
}

export default PopupMessageHandler;
