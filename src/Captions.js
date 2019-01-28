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
    const {
      adapter,
      settings,
      currentCaptionToRender
    } = this.props;
    //
    let className = 'dc-caption';
    if (adapter.captionClassName) {
      className = `${className} ${adapter.captionClassName}`
    }
    if (settings.extraSpace) {
      className = `${className} extra-space`;
    }
    if (!currentCaptionToRender) {
      return null;
    }
    if (!settings.isOn) { // TODO - Switch to if (settings.isOn)
      return null;
    } else {
      // Translate new lines (\n) to <br> elements
      const captionToRender = currentCaptionToRender.split('\n').map(sentence => (
        <React.Fragment>
          <span>{sentence}</span>
          <br/>
        </React.Fragment>
      ));
      return (
        <div
          className={className}
          ref={ref => { this.captionRef = ref }}
          style={{cssText: this.props.adapter.captionStyle}}>
          { captionToRender }
        </div>
      );
    }
  }
}

export default Captions;
