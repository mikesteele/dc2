import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import Site from './Site';
import Adapter from './Adapter';
import Parser from './Parser';
import PopupMessageHandler from './PopupMessageHandler';
import Provider from './Provider';
import Captions from './Captions';
import TranslationQueue from './TranslationQueue';
import { NetflixAdapterCreator } from './adapters/netflix';
import { YoutubeAdapterCreator } from './adapters/youtube';
import { EdxAdapterCreator } from './adapters/edx';
import InjectedStyles from './Styles';
import withTimer from './with-timer';

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <InjectedStyles/>
        <Site>
          {(site) => {
            let ConnectedAdapter;
            if (site ===  'netflix') {
              ConnectedAdapter = withTimer(Adapter, NetflixAdapterCreator);
              // TODO - Should have an HOC to pass site
            } else if (site === 'youtube') {
              ConnectedAdapter = withTimer(Adapter, YoutubeAdapterCreator);
            } else if (site === 'edx') {
              ConnectedAdapter = withTimer(Adapter, EdxAdapterCreator);
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
                  <TranslationQueue>
                  {(queue) => (
                    <Parser>
                      {(parser) => (
                        <PopupMessageHandler adapter={adapter}>
                          {(settings) => (
                            <Provider
                              adapter={adapter}
                              parser={parser}
                              settings={settings}
                              queue={queue}>
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
                  </TranslationQueue>
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
