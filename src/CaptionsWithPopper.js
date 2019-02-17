import React from 'react';
import Popper from 'popper.js';
import WithPopper from './Popper';

class CaptionsWithPopper extends React.Component {
  render() {
    const {
      adapter,
      settings,
      currentCaptionToRender
    } = this.props;

    if (!settings.isOn || !currentCaptionToRender) {
      return null;
    }

    // Caption Window props
    const captionWindowProps = {
      className: 'dc-window'
    };
    if (adapter.captionWindowStyle) {
      captionWindowProps.style = {
        ...adapter.captionWindowStyle
      };
    }

    // Caption props
    const captionProps = {
      className: 'dc-caption'
    };
    if (adapter.captionClassName) {
      captionProps.className = `${captionProps.className} ${adapter.captionClassName}`;
    }
    if (adapter.captionStyle) {
      captionProps.style = {
        ...adapter.captionStyle
      };
    }

    // Replace \n's with <br/> elements - TODO - Improve this
    const captionToRender = currentCaptionToRender.split('\n').map(sentence => (
      <React.Fragment>
        <span>{sentence}</span>
        <br/>
      </React.Fragment>
    ));

    return (
      <div {...captionWindowProps}>
        <WithPopper target={adapter.captionWindow}>
          <div {...captionProps}>
            { captionToRender }
          </div>
        </WithPopper>
      </div>
    );
  }
}

export default CaptionsWithPopper;
