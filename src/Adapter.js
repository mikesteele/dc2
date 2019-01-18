<<<<<<< HEAD
import React from 'react';

class Adapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      site: null,
      videoId: null
    };
    this.detectSite = this.detectSite.bind(this);
    this.detectVideoId = this.detectVideoId.bind(this);

    // Detect the current site & video ID
    this.detectSite().then(this.detectVideoId);
  }

  componentDidMount() {
    // TODO global.chrome.onMessage(this.onMessage)
  }

  detectSite() {
    return Promise.resolve();
    /**
    TODO
    const currentUrl = window.location.href;
    if (`currentUrl matches netflix.com`) { // TODO
      this.setState({
        site: 'netflix'
      });
    }
    **/
  }

  detectVideoId() {
    if (this.state.site) {
      // TODO
    }
  }

  onMessage() {
    /**
    TODO
    switch (message.type) {
      case 'tab-did-update':
      // In case site or video ID changed, re-detect
      this.detectSite().then(this.detectVideoId);
      break;
    }
    **/
  }

  render() {
    const { site, videoId } = this.state;
    const { awareness, awarenessIsInDOM } = this.props;
    let playerCurrentTime = null;
    let captionText = null;
    const onPopupOpened = () => { console.log('TODO') };
    if (awareness) {
      const { video } = awareness;
      playerCurrentTime = video && video.currentTime;
      captionText = awareness.captionText;
    }
    const adapter = {
      awareness,
      awarenessIsInDOM,
      captionText,
      playerCurrentTime,
      videoId,
      onPopupOpened,
      site
    };
    return this.props.children(adapter);
  }
}
=======
const Adapter = (props) => {
  const { awareness, awarenessIsInDOM, site } = props;
  let playerCurrentTime = null;
  let videoId = 'TODO';
  let captionText = null;
  let captionWindow = null;
  let captionWindowPosition = null;
  const onPopupOpened = () => { console.log('TODO') };
  if (awareness) {
    const { video } = awareness;
    playerCurrentTime = video && video.currentTime;
    captionText = awareness.captionText;
    captionWindow = awareness.captionWindow;
    captionWindowPosition = awareness.captionWindowPosition;
  }
  const adapter = {
    awareness,
    awarenessIsInDOM,
    captionText,
    captionWindow,
    captionWindowPosition,
    playerCurrentTime,
    videoId,
    onPopupOpened,
    site
  };
  return props.children(adapter);
};
>>>>>>> origin/netflix

export default Adapter;
