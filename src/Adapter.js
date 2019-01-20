import React from 'react';

class Adapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: 'TODO'
    };
    this.detectVideoId = this.detectVideoId.bind(this);

    if (this.props.site) {
      // TODO - Does this work?
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
    const { awareness, site } = this.props;
    let playerCurrentTime = null;
    let captionClassName = null;
    let captionWindow = null;
    let captionWindowPosition = null;
    let captionStyle = null;
    const onPopupOpened = () => { console.log('TODO') };
    if (awareness) {
      const { video } = awareness;
      playerCurrentTime = video && video.currentTime;
      captionWindow = awareness.captionWindow;
      captionWindowPosition = awareness.captionWindowPosition;
      captionStyle = awareness.captionStyle;
      captionClassName = awareness.captionClassName; // TODO - Use null?
    }
    const adapter = {
      captionClassName,
      captionStyle,
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
