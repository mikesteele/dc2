import React from 'react';
import Popper from 'popper.js';

class Captions extends React.Component {
  constructor(props) {
    super(props);
    this.attachToCaptionWindow = this.attachToCaptionWindow.bind(this);
    this.canAttachToCaptionWindow = this.canAttachToCaptionWindow.bind(this);
  }

  canAttachToCaptionWindow() {
    return this.captionRef && this.props.adapter.captionWindow;
  }

  attachToCaptionWindow() {
    console.log('Attaching...');
    this.popper = new Popper(
      this.props.adapter.captionWindow,
      this.captionRef
    );
  }

  componentDidMount() {
    if (this.canAttachToCaptionWindow()) {
      this.attachToCaptionWindow();
    }
  }

  componentWillUnmount() {
    // TODO - Delete this.popper - ?
  }

  componentDidUpdate(prevProps) {
    if (prevProps.adapter.captionWindowPosition !== this.props.adapter.captionWindowPosition) {
      if (this.canAttachToCaptionWindow()) {
        this.attachToCaptionWindow();
      }
    }
  }

  render() {
    let className = 'dc-caption';
    if (this.props.adapter.captionClassName) {
      className = `${className} ${this.props.adapter.captionClassName}`
    }
    if (this.props.settings.extraSpace) {
      className = `${className} extra-space`;
    }
    if (!this.props.settings.isOn) {
      return null;
    } else {
      return (
        <div
          className={className}
          ref={ref => { this.captionRef = ref }}
          style={{cssText: this.props.adapter.captionStyle}}>
          { this.props.currentCaptionToRender }
        </div>
      );
    }
  }
}

export default Captions;
