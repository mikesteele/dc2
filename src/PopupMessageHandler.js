import React from 'react';

class PopupMessageHandler extends React.Component {
  constructor(props) {
    super(props);
    this.onMessage = this.onMessage.bind(this);

    // TODO - What should be default settings?
    // TODO - Need settingsAreDefault?
    this.state = {
      settings: {
        isOn: true,
        secondSubtitleLanguage: 'en'
      }
    }
  }

  componentDidMount() {
    if (global.chrome && global.chrome.runtime && global.chrome.runtime.onMessage) {
      global.chrome.runtime.onMessage.addListener(this.onMessage);
    }
  }

  componentWillUnmount() {
    if (global.chrome && global.chrome.runtime && global.chrome.runtime.onMessage) {
      global.chrome.runtime.onMessage.removeListener(this.onMessage); // TODO - Untested
    }
  }

  onMessage(message, sender, sendResponse) {
    // TODO - Untested
    if (!message.type) return;
    switch (message.type) {
      case 'detect-site':
      sendResponse({
        ok: true,
        site: this.props.adapter.site
      });
      break;

      case 'start-observer':
      // TODO - Rename this message.type to 'turn-on'
      this.setState({
        isOn: true
      });
      sendResponse({
        ok: true
      });
      // TODO - When should show no-player error?
      break;

      case 'stop-observer':
      // TODO - Rename this message.type to 'turn-off'
      this.setState({
        isOn: false
      });
      sendResponse({
        ok: true
      });
      break;

      case 'get-state':
      sendResponse({
        ok: true,
        settingsAreDefault: true, // TODO
        isOn: this.state.settings.isOn,
        secondLanguage: this.state.settings.secondLanguage, // TODO
        settings: {
          extraSpace: true, // TODO
          useCaptionsFromVideo: true, // TODO - Deprecate this setting
          delayRenderingUntilTranslation: true // TODO - Deprecate this setting
        },
        loadedLanguages: [] // TODO - Pass provider, then use this.props.provider.loadedLanguages
      });
      break;

      // TODO - Add other message.types

      default:
      break;
    }
  }

  render() {
    const settings = this.state.settings;
    return this.props.children(settings);
  }
}

export default PopupMessageHandler;
