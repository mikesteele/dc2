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

    if (adapter.caption) {
      const captionStyle = window.getComputedStyle(adapter.caption);
      this.previousCaptionStyle = captionStyle.cssText;
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
    if (this.previousCaptionStyle) {
      captionProps.style = {
        cssText: this.previousCaptionStyle
      };
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
            <br/>
            { captionToRender }
          </div>
        </React.Fragment>
      ), captionWindow);
      const previousPosition = (
        <WithPopper
          target={captionWindow}
          onPositionChanged={this.onPopperPositionChanged}>
          <div {...captionProps}>
            <br/>
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
              <br/>
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
