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

    const captionWindowProps = {};
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
        <WithPopper
          target={captionWindow}
          onPositionChanged={this.onPopperPositionChanged}>
          <div {...captionWindowProps}>
            <div {...captionProps}>
              { captionToRender }
            </div>
          </div>
        </WithPopper>
      );
    } else if (this.previousPosition) {
      // TODO - Write test to be sure classes passed by Popper (eg. 'dc-popper') are passed when using previous position
      return (
        <div className='dc-popper' style={this.previousPosition}>
          <div {...captionWindowProps}>
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
