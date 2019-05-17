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

    const captionWindowProps = {};
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
          <div {...captionWindowProps} style={{visibility: 'hidden'}}>
            <div {...captionProps}>
              { captionToRender }
            </div>
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
