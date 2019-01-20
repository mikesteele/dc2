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
import AmazonAdapter from './adapters/amazon';
import InjectedStyles from './Styles';

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <InjectedStyles/>
        <Site>
          {(site) => {
            let ConnectedAdapter;
            if (site ===  'netflix') {
              ConnectedAdapter = withPersistentAwareness(Adapter, NetflixAdapter);
              // TODO - Should have an HOC to pass site
            } else if (site === 'youtube') {
              ConnectedAdapter = withPersistentAwareness(Adapter, YoutubeAdapter);
            } else if (site === 'amazon') {
              ConnectedAdapter = withPersistentAwareness(Adapter, AmazonAdapter);
            } else if (site === null) {
              return (
                <div/>
              );
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
                            {(currentCaptionToRender) => (
                              <Captions
                                adapter={adapter}
                                currentCaptionToRender={currentCaptionToRender}
                                settings={settings}
                              />
                            )}
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
