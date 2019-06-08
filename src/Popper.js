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
    console.log('Creating new Popper.');
    this.popper = new Popper(
      this.props.target,
      this.popperPosition,
      {
        onCreate: (data) => {
          if (this.props.onPositionChanged) {
            this.props.onPositionChanged(data.styles);
          }
        },
        onUpdate: (data) => {
          if (this.props.onPositionChanged) {
            this.props.onPositionChanged(data.styles);
          }
        },
        placement: 'bottom',
        modifiers: {
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
      this.moveTarget();
      this.createPopper();
    }
  }

  componentWillUnmount() {
    if (this.popper) {
      this.popper.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.target !== this.props.target && this.canAttachToTarget()) {
      this.moveTarget();
      this.createPopper();
    } else {
      if (this.popper) {
        this.popper.scheduleUpdate();
      }
    }
  }

  moveTarget() {
    const target = this.props.target;
    const DC_MOVED = '0.1234px'; // Value that notes if a target.style was set by DC.
    const MOVE_AMOUNT = '150px';
    if (target) {
      if (target.style.top && !target.style.top.includes(DC_MOVED)) {
        console.log(`Setting style top...${target.style.top}`);
        target.style.top = `calc(${target.style.top} - ${MOVE_AMOUNT} + ${DC_MOVED})`; // TODO - Untested
      } else if (target.style.bottom && !target.style.bottom.includes(DC_MOVED)) {
        console.log(`Setting style bottom...${target.style.bottom}`);
        target.style.bottom = `calc(${target.style.bottom} + ${MOVE_AMOUNT} + ${DC_MOVED})`;
      } else {
        // TODO - Negative margin top/bottom?
      }
    }
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
