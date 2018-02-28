// @flow
import * as React from 'react';

type State = {
  Component: React.Node,
  isLoading: boolean,
};

export default (asyncRoute: Function) =>
  class AsyncRoute extends React.PureComponent<any, State> {
    static Component = null;

    state = { Component: AsyncRoute.Component, isLoading: true };

    async componentWillMount() {
      if (this.state.Component) return;

      let componentProps;
      const { default: Component } = await asyncRoute();

      if (Component.getInitialProps) {
        componentProps = await Component.getInitialProps();
      }

      if (this.mounted) this.setState({ Component, ...componentProps, isLoading: false });
    }

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    mounted = false;

    render() {
      const { Component, isLoading, ...componentProps } = this.state;

      if (Component) return <Component {...componentProps} isLoading={isLoading} />;

      return null;
    }
  };
