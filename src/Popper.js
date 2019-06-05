import React from 'react';
import Popper from 'popper.js';

class WithPopper extends React.Component {
  constructor(props) {
    super(props);
    this.canAttachToTarget = this.canAttachToTarget.bind(this);
    this.createPopper = this.createPopper.bind(this);
    this.popper = null;
  }

  createPopper() {
    this.popper = new Popper(
      this.props.target,
      this.popperPosition,
      {
        onCreate: (data) => {
          if (this.props.onPositionChanged) {
            this.props.onPositionChanged(data.styles); // TODO - This shouldn't be here
          }
        },
        placement: 'bottom',
        modifiers: {
          preventOverflow: {
            enabled: false
          },
          flip: {
            enabled: false
          }
        }
      }
    );
  }

  canAttachToTarget() {
    return this.props.target && this.popperPosition;
  }

  componentDidMount() {
    if (this.canAttachToTarget()) {
      this.createPopper();
    }
  }

  componentWillUnmount() {
    // TODO - Delete this.popper - ?
  }

  componentDidUpdate(prevProps) {
    // TODO - Update Popper
  }

  render() {
    return (
      <div className='dc-popper' ref={(ref) => this.popperPosition = ref}>
        {this.props.children}
      </div>
    );
  }
}

export default WithPopper;
