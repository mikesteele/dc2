import React from 'react';
import withPersistentAwareness from './with-persistent-awareness';

const Adapter = (props) => {
  const site = 'netflix';
  const { awareness, awarenessIsInDOM } = props;
  let playerCurrentTime = null;
  let videoId = 'TODO';
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
  return props.children(adapter);
};

const ConnectedAdapter = withPersistentAwareness(Adapter, {
  root: document.body,
  uniqueSelector: '.nfp.AkiraPlayer',
  value: (node) => {
    const captionWindow = document.querySelector('.player-timedtext');
    const video = document.querySelector('video');
    return {
      root: node,
      captionText: captionWindow ? captionWindow.textContent : null,
      video: video ? video : null
    };
  }
});


const Parser = (props) => {
  const parseNetflixCaptionFile = (captionFile) => {
    return new Promise((resolve, reject) => {
      const captions = [];
      const domParser = new DOMParser();
      const xml = domParser.parseFromString(captionFile, 'text/xml');
      const tt = xml.querySelector('tt');
      let tickRate;
      if (tt) {
        tickRate = tt.getAttribute('ttp:tickRate');
      }
      const body = xml.querySelector('body');
      const captionsContainer = body.firstElementChild;
      if (body && captionsContainer && tickRate) {
        for (let i = 0; i < captionsContainer.children.length; i++) {
          const currentChild = captionsContainer.children[i];
          if (currentChild.tagName === 'p') {
            const begin = currentChild.getAttribute('begin');
            const end = currentChild.getAttribute('end');
            if (begin && end) {
              // Netflix uses the tick rate defined in <tt ttp:tickRate/>
              // to time the captions. Ex. '10000t' === 10000 / tickRate
              const tickRatePattern = /(\d+)t/;
              if (tickRatePattern.test(begin) && tickRatePattern.test(end)) {
                let startTime = tickRatePattern.exec(begin)[1];
                let endTime = tickRatePattern.exec(end)[1];
                startTime = startTime / tickRate;
                endTime = endTime / tickRate;
                /**
                For some videos, Netflix stores a caption as two (or more?) seperate elements in the caption XML.
                For example:
                +---------------------+
                | Hello! How have you |
                |    been lately?     |
                +---------------------+
                Could look like this in the XML:
                <p begin="100t" end="200t">Hello! How have you</p>
                <p begin="100t" end="200t">been lately?</p>
                Note that the two elements will have the same `begin` and `end` times though,
                so here we concatenate the new caption with the last caption if they have the same times.
                **/
                if (captions.length
                    && captions[captions.length - 1]
                    && captions[captions.length - 1].startTime === startTime
                    && captions[captions.length - 1].endTime   === endTime) {
                  const lastCaption = captions[captions.length - 1];
                  lastCaption.text = `${lastCaption.text}<br/>${currentChild.innerHTML}`;
                } else {
                  captions.push({
                    startTime: startTime,
                    endTime: endTime,
                    text: currentChild.innerHTML
                  });
                }
              } else {
                reject('Unable to use captions, begin or end attribute is unable to be converted.');
                return;
              }
            } else {
              reject('Unable to use captions, missing begin or end attributes.');
              return;
            }
          }
        }
        if (captions.length) {
          resolve(captions);
        } else {
          reject(`Couldn't parse captions from file`);
        }
      } else {
        reject(`Can't parse invalid Netfix caption file`);
      }
    });
  }
  const parse = (captionFile, currentSite) => {
    if (currentSite === 'netflix') {
      return parseNetflixCaptionFile(captionFile);
    } else {
      return Promise.reject('Site not supported.'); // TODO
    }
  };
  const parser = {
    parse
  };
  return props.children(parser);
};

class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      captions: {},
      translations: {}
    }
    this.onMessage = this.onMessage.bind(this);
    if (global.chrome && global.chrome.runtime && global.chrome.runtime.onMessage) {
      global.chrome.runtime.onMessage.addListener(this.onMessage);
    }
  }

  canUseCaptionsFromVideo() {
    return false;
  }

  guessLanguageOfCaptions(captions) {
    // TODO
    return Promise.resolve({
      captions,
      language: 'en'
    });
  }

  loadCaptions(captions, language) {
    const currentSite = this.props.adapter.site;
    const videoId = this.props.adapter.videoId;
    // TODO
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
          console.log(`processor - Loading captions for ${language}...`);
          return window.DC.provider.__loadCaptions(captions, language)
        })
        .then(() => {
          console.log('Loaded.');
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
    console.log('provider re-rendering...');
    const { adapter } = this.props;
    const captionText = adapter.captionText;
    console.log(adapter)

    let currentCaptionToRender = 'Loading...';
    if (this.canUseCaptionsFromVideo()) {
      currentCaptionToRender = this.getCaptionToRender();
    }
    // else {
    //   currentCaptionToRender = this.translate(captionText);
    // }
    return this.props.children(currentCaptionToRender);
  }
};


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
      isOn: true
    });
  }
}

class App extends React.Component {
  render() {
    return (
      <ConnectedAdapter>
        {(adapter) => (
          <Parser>
            {(parser) => (
              <Provider
                adapter={adapter}
                parser={parser}>
                {(currentCaptionToRender) => (
                  <PopupMessageHandler>
                    {(settings) => {
                      if (settings.isOn) {
                        return <div>{currentCaptionToRender}</div>
                      } else {
                        return null;
                      }
                    }}
                  </PopupMessageHandler>
                )}
              </Provider>
            )}
          </Parser>
        )}
      </ConnectedAdapter>
    );
  }
}

export default App;
