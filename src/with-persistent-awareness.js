import React from 'react';

export default function withPersistentAwareness(WrappedComponent, options) {
  return class extends React.Component {
    constructor(props) {
      if (!props.root || !props.uniqueSelector) {
        // TODO
      }
      super(props);
      this.onMutation = this.onMutation.bind(this);
      this.observer = new MutationObserver(this.onMutation);

      this.state = {
        awareOf: null,
        awarenessIsInDOM: false
      }
    }

    onMutation() {
      const awareOf = options.root.querySelector(options.uniqueSelector);
      if (awareOf && !this.state.awareOf) {
        this.setState({
          awareOf: awareOf
        });
      } else if (!awareOf && this.state.awareOf) {
        this.setState({
          awareOf: null
        });
      } else {
        this.forceUpdate();
      }
    }

    componentDidMount() {
      this.observer.observe(options.root, {
        attributes: true,
        subtree: true,
        childList: true
      });
    }

    componentWillUnmount() {
      this.observer.disconnect();
    }

    render() {
      let passValue = null;
      if (this.state.awareOf) {
        passValue = options.value ? options.value(this.state.awareOf) : this.state.awareOf;
      }
      return (
        <WrappedComponent
          awarenessIsInDOM={!!this.state.awareOf}
          awareness={passValue}
         {...this.props}
        />
      );
    }
  };
}
