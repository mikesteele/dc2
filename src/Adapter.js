import React from 'react';

class Adapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: null
    };
    this.detectVideoId = this.detectVideoId.bind(this);
    this.onMessage = this.onMessage.bind(this);
  }

  componentDidMount() {
    if (global.chrome && global.chrome.runtime && global.chrome.runtime.onMessage) {
      global.chrome.runtime.onMessage.addListener(this.onMessage);
    }
  }

  componentDidUpdate(prevProps) {
    // TODO - Could optimize
    if (this.props.site && !this.state.videoId) {
      this.detectVideoId();
    }
  }

  componentWillUnmount() {
    if (global.chrome && global.chrome.runtime && global.chrome.runtime.onMessage) {
      global.chrome.runtime.onMessage.removeListener(this.onMessage); // TODO - Untested
    }
  }

  detectVideoId() {
    let videoId = this.state.videoId;
    if (this.props.site === 'netflix') {
      videoId = this.detectNetflixVideoId();
    } else if (this.props.site === 'youtube') {
      videoId = this.detectYoutubeVideoId(); // TODO - Audit repo for Youtube vs YouTube
    } else if (this.props.site === 'edx') {
      videoId = this.detectEdxVideoId();
    }
    if (videoId !== this.state.videoId) {
      // TODO - There are probably other places where I'm setting state unnecessarily
      this.setState({
        videoId
      });
    }
  }

  detectNetflixVideoId() {
    const videoIdPattern = /watch\/(\d+)/;
    const pathname = window.location.pathname;
    if (videoIdPattern.test(pathname)) {
      return videoIdPattern.exec(pathname)[1];
    } else {
      return null;
    }
  }

  detectYoutubeVideoId() {
    const url = new URL(window.location.href);
    const videoId = url.searchParams.get('v');
    return videoId ? videoId : null;
  }

  detectEdxVideoId() {
    // TODO - How can I improve this?
    // TODO - Does it matter?
    return window.location.href;
  }

  onMessage(message, sender, sendResponse) {
    if (!message.type) return;
    switch (message.type) {
      case 'tab-updated-url':
      this.detectVideoId();
      break;

      default:
      break;
    }
  }

  render() {
    const { awareness, site } = this.props;
    const { videoId } = this.state;
    let playerCurrentTime = null;
    let canRenderInCaptionWindow = false;
    let captionClassName = null;
    let captionWindow = null;
    let captionWindowPosition = null;
    let captionWindowStyle = null;
    let captionStyle = null;
    const onPopupOpened = () => { console.log('TODO') };
    if (awareness) {
      const { video } = awareness;
      playerCurrentTime = awareness.playerCurrentTime || video && video.currentTime;
      captionWindow = awareness.captionWindow;
      captionWindowPosition = awareness.captionWindowPosition;
      captionStyle = awareness.captionStyle;
      captionClassName = awareness.captionClassName; // TODO - Use null?
      captionWindowStyle = awareness.captionWindowStyle;
      canRenderInCaptionWindow = awareness.canRenderInCaptionWindow;
    }
    const adapter = {
      canRenderInCaptionWindow,
      captionClassName,
      captionStyle,
      captionWindow,
      captionWindowPosition,
      captionWindowStyle,
      playerCurrentTime,
      videoId,
      onPopupOpened,
      site
    };
    return this.props.children(adapter);
  }
}

export default Adapter;
