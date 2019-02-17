import React from 'react';
import ReactDOM from 'react-dom';
import WithPopper from './Popper';

class Captions extends React.Component {
  constructor(props) {
    super(props);
    this.onPopperPositionChanged = this.onPopperPositionChanged.bind(this);
  }

  onPopperPositionChanged(position) {
    this.previousPosition = position;
  }

  render() {
    const {
      adapter,
      settings,
      currentCaptionToRender
    } = this.props;

    const {
      canRenderInCaptionWindow,
      captionWindow
    } = adapter;

    if (!settings.isOn || !currentCaptionToRender) {
      return null;
    }

    const captionWindowProps = {
      className: 'dc-window'
    };
    if (adapter.captionWindowStyle) {
      captionWindowProps.style = {
        ...adapter.captionWindowStyle
      };
    }

    const captionProps = {};
    if (adapter.captionStyle) {
      captionProps.style = {...adapter.captionStyle};
    }
    if (settings.extraSpace) {
      captionProps.className = 'extra-space';
    }

    // Replace \n's with <br/> elements
    const captionToRender = currentCaptionToRender.split('\n').map(sentence => (
      <React.Fragment>
        <span>{sentence}</span>
        <br/>
      </React.Fragment>
    ));

    if (captionWindow && canRenderInCaptionWindow) {
      return ReactDOM.createPortal((
        <div {...captionProps}>
          { captionToRender }
        </div>
      ), captionWindow);
    } else if (captionWindow && !canRenderInCaptionWindow) {
      return (
        <div {...captionWindowProps}>
          <WithPopper
            target={captionWindow}
            onPositionChanged={this.onPopperPositionChanged}>
            <div {...captionProps}>
              { captionToRender }
            </div>
          </WithPopper>
        </div>
      );
    } else if (this.previousPosition) {
      return (
        <div {...captionWindowProps}>
          <div style={this.previousPosition}>
            <div {...captionProps}>
              { captionToRender }
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Captions;
