import React from 'react';
import withPersistentAwareness from './with-persistent-awareness';
import Adapter from './Adapter';
import Parser from './Parser';
import PopupMessageHandler from './PopupMessageHandler';
import Provider from './Provider';
import NetflixAdapter from './adapters/netflix';
import YoutubeAdapter from './adapters/youtube';

const ConnectedAdapter = withPersistentAwareness(Adapter, YoutubeAdapter);

class App extends React.Component {
  render() {
    return (
      <ConnectedAdapter>
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
  }
}

export default App;
