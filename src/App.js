import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import withPersistentAwareness from './with-persistent-awareness';
import Site from './Site';
import Adapter from './Adapter';
import Parser from './Parser';
import PopupMessageHandler from './PopupMessageHandler';
import Provider from './Provider';

const NetflixAdapter = {
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
}

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Site>
          {(site) => {
            let ConnectedAdapter;
            if (site ===  'netflix') {
              ConnectedAdapter = withPersistentAwareness(Adapter, NetflixAdapter);
              // TODO - Should have an HOC to pass site
            } else {
              throw new Error(`No adapter found for site: ${site}`); // TODO - Doesn't get caught by ErrorBoundary
            }
            return (
              <ConnectedAdapter site={site}>
                {(adapter) => (
                  <Parser>
                    {(parser) => (
                      <PopupMessageHandler>
                        {(settings) => (
                          <Provider
                            adapter={adapter}
                            parser={parser}
                            settings={settings}>
                            {(currentCaptionToRender) => {
                              if (settings.isOn) {
                                return <div>{currentCaptionToRender}</div>
                              } else {
                                return null;
                              }
                            }}
                          </Provider>
                        )}
                      </PopupMessageHandler>
                    )}
                  </Parser>
                )}
              </ConnectedAdapter>
            );
          }}
        </Site>
      </ErrorBoundary>
    );
  }
}

export default App;
