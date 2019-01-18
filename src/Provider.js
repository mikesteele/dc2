import React from 'react';

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      captions: {},
      translations: {}
    }
    this.onMessage = this.onMessage.bind(this);
    this.canUseCaptionsFromVideo = this.canUseCaptionsFromVideo.bind(this);
    if (global.chrome && global.chrome.runtime && global.chrome.runtime.onMessage) {
      global.chrome.runtime.onMessage.addListener(this.onMessage);
    }
  }

  canUseCaptionsFromVideo() {
    const currentSite = this.props.adapter.site;
    const videoId = this.props.adapter.videoId;
    const secondSubtitleLanguage = this.props.settings.secondSubtitleLanguage;
    if (this.state.captions
      && this.state.captions[currentSite]
      && this.state.captions[currentSite][videoId]
      && this.state.captions[currentSite][videoId][secondSubtitleLanguage]) {
      return true;
    } else {
      return false;
    }
  }

  getCaptionToRender() {
    const currentSite = this.props.adapter.site;
    const videoId = this.props.adapter.videoId;
    const secondSubtitleLanguage = this.props.settings.secondSubtitleLanguage;
    const currentTime = this.props.adapter.playerCurrentTime;
    const captions = this.state.captions[currentSite][videoId][secondSubtitleLanguage];
    let captionToRender = captions.find(caption => {
      return caption.startTime < currentTime && currentTime < caption.endTime;
    });
    if (captionToRender) {
      return captionToRender.text;
    } else {
      return null;
    }
  }

  guessLanguageOfCaptions(captions) {
    // TODO
    return Promise.resolve({
      captions,
      language: 'en'
    });
  }

  loadCaptions(captions, language) {
    return new Promise((resolve, reject) => {
      const currentSite = this.props.adapter.site;
      const videoId = this.props.adapter.videoId;
      this.setState(state => {
        let nextState = {...state};
        if (state.captions[currentSite] && state.captions[currentSite][videoId]) {
          // TODO - Bail out if already loaded this language
          nextState.captions[currentSite][videoId][language] = captions;
        } else if (state.captions[currentSite]) {
          nextState.captions[currentSite][videoId] = {};
          nextState.captions[currentSite][videoId][language] = captions;
        } else {
          nextState.captions[currentSite] = {};
          nextState.captions[currentSite][videoId] = {};
          nextState.captions[currentSite][videoId][language] = captions;
        }
        return nextState;
      }, () => {
        resolve();
      });
    });
  }

  onMessage(message, sender, sendResponse) {
    if (!message.type) return;
    switch (message.type) {
      case 'process-netflix-caption-request': // TODO - Should be process-caption-request?
      this.fetchUrl(message.payload)
        .then(captionFile => this.props.parser.parse(captionFile, this.props.adapter.site))
        .then(this.guessLanguageOfCaptions)
        .then(result => {
          const {captions, language} = result;
          return this.loadCaptions(captions, language);
        })
        .then(() => {
          console.log('Loaded.');
          console.log(this.state);
          sendResponse({
            ok: true
          });
        })
        .catch(err => {
          console.log(err);
          sendResponse({
            ok: false,
            error: err
          });
        });
      break;

      default:

      break;
    }
  }

  fetchUrl(url) {
    return new Promise((resolve, reject) => {
      global.fetch(url)
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            return Promise.reject(`Couldn't fetch captions, have credentials expired?`);
          }
        })
        .then(responseText => {
          if (responseText && responseText.length) {
            resolve(responseText);
          } else {
            reject(`Couldn't fetch captions, response to replay was empty.`);
          }
        })
        .catch(err => {
          reject(`Couldn't fetch captions.`);
        });
    });
  }

  /**
   *  MVP doesn't include Google Translated captions
   *

  translate(captionText) {
    if (this.state.translations[captionText]) {
      return this.state.translations[captionText];
    } else {
      setTimeout(() => {
        this.setState(state => ({
          translations: {
            ...state.translations,
            [captionText]: 'Translated!'
          }
        }));
      }, 1000);
      return 'Loading...';
    }
  }

  **/

  render() {
    const { adapter } = this.props;
    const captionText = adapter.captionText;

    let currentCaptionToRender = 'Loading...';
    if (this.canUseCaptionsFromVideo()) {
      currentCaptionToRender = this.getCaptionToRender();
    }

    return this.props.children(currentCaptionToRender);
  }
};

export default Provider;
