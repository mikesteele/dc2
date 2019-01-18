import React from 'react';

class Adapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: null
    };
    this.detectVideoId = this.detectVideoId.bind(this);

    if (this.props.site) {
      this.detectVideoId();
    }
  }

  componentDidMount() {
    // TODO - global.chrome.onMessage(this.onMessage)
  }

  detectVideoId() {
    if (this.props.site) {
      this.setState({
        videoId: 'TODO'
      });
    }
  }

  onMessage() {
    // TODO - If tab did navigate, re-detect video ID
  }

  render() {
    const { videoId } = this.state;
    const { awareness, awarenessIsInDOM, site } = this.props;
    let playerCurrentTime = null;
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
    return this.props.children(adapter);
  }
}

export default Adapter;
