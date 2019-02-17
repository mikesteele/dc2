import React from 'react';
import Popper from 'popper.js';

// TODO - Rename
class WithPopper extends React.Component {
  constructor(props) {
    super(props);
    this.attachToTarget = this.attachToTarget.bind(this);
    this.canAttachToTarget = this.canAttachToTarget.bind(this);
  }

  canAttachToTarget() {
    return this.props.target && this.popperPosition;
  }

  attachToTarget() {
    console.log('Attaching...');
    this.popper = new Popper(
      this.props.target,
      this.popperPosition,
      {
        onCreate: (data) => {
          if (this.props.onPositionChanged) {
            this.props.onPositionChanged(data.styles);
          }
        }
      }
    );
  }

  componentDidMount() {
    if (this.canAttachToTarget()) {
      this.attachToTarget();
    }
  }

  componentWillUnmount() {
    // TODO - Delete this.popper - ?
  }

  componentDidUpdate(prevProps) {
    // TODO - Can optimize
    if (this.canAttachToTarget()) {
      this.attachToTarget();
    }
  }

  render() {
    return (
      <div ref={(ref) => this.popperPosition = ref}>
        {this.props.children}
      </div>
    );
  }
}

export default WithPopper;
