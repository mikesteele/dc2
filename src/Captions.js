import React from 'react';
import ReactDOM from 'react-dom';
import Popper from 'popper.js';

class Captions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      adapter,
      settings,
      currentCaptionToRender
    } = this.props;

    const {
      captionWindow
    } = adapter;

    if (!settings.isOn || !currentCaptionToRender) {
      return null;
    }

    if (captionWindow) {
      return ReactDOM.createPortal((<div>{currentCaptionToRender}</div>), captionWindow);
    } else {
      return null;
    }
  }
}

export default Captions;
