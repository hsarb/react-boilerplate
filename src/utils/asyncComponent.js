// @flow
import * as React from 'react';

type State = {
  Component: React.Node,
};

export default (asyncComponent: Function) =>
  class AsyncComponent extends React.PureComponent<any, State> {
    static Component = null;

    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (this.state.Component) return;

      asyncComponent().then(({ default: Component }) => {
        AsyncComponent.Component = Component;

        if (this.mounted) this.setState({ Component });
      });
    }

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    mounted = false;

    render() {
      const { Component } = this.state;

      if (Component) return <Component {...this.props} />;

      return null;
    }
  };
