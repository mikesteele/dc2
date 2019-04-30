import React from 'react';
import ReactDOM from 'react-dom';
import WithPopper from './Popper';

class Captions extends React.Component {
  constructor(props) {
    super(props);
    this.onPopperPositionChanged = this.onPopperPositionChanged.bind(this);
    this.previousPosition = null;
    this.previousCaptionStyle = null;
    this.previousCaptionWindowStyle = null;
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

    if (adapter.captionStyle) {
      this.previousCaptionStyle = adapter.captionStyle;
    }
    if (adapter.captionWindowStyle) {
      this.previousCaptionWindowStyle = adapter.captionWindowStyle;
    }

    const captionWindowProps = {
      className: 'dc-window'
    };
    if (adapter.captionWindowStyle) {
      captionWindowProps.style = {
        ...adapter.captionWindowStyle
      };
    } else if (this.previousCaptionWindowStyle) {
      captionWindowProps.style = {...this.previousCaptionWindowStyle};
    }

    const captionProps = {};
    if (adapter.captionStyle) {
      captionProps.style = {...adapter.captionStyle};
    } else if (this.previousCaptionStyle) {
      captionProps.style = {...this.previousCaptionStyle};
    } else if (adapter.defaultCaptionStyle) {
      captionProps.style = {...adapter.defaultCaptionStyle};
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
      const portal = ReactDOM.createPortal((
        <React.Fragment>
          <div {...captionProps}>
            { captionToRender }
          </div>
        </React.Fragment>
      ), captionWindow);
      const previousPosition = (
        <WithPopper
          target={captionWindow}
          onPositionChanged={this.onPopperPositionChanged}>
          <div {...captionProps}>
            { captionToRender }
          </div>
        </WithPopper>
      );
      return (
        <React.Fragment>
          { portal }
          { previousPosition }
       </React.Fragment>
      );
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
