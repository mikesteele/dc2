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
    console.log('Rendering...')
    console.log(this.props.adapter);
    return (
      <div ref={ref => { this.captionRef = ref }}>
        { this.props.currentCaptionToRender }
      </div>
    );
  }
}

export default Captions;
