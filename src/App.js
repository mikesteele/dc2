import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import withPersistentAwareness from './with-persistent-awareness';
import Site from './Site';
import Adapter from './Adapter';
import Parser from './Parser';
import PopupMessageHandler from './PopupMessageHandler';
import Provider from './Provider';
import Captions from './Captions';
import NetflixAdapter from './adapters/netflix';
import YoutubeAdapter from './adapters/youtube';

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
