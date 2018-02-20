// @flow
import * as React from 'react';
import type { Location } from 'react-router-dom';
import { trackRoute } from '../utils/analytics';

type Props = {
  location: Location,
};

type State = {
  isLoading: boolean,
};

export default (Component: any) =>
  class NewView extends React.Component<Props, State> {
    state = { isLoading: false };

    async componentWillMount() {
      this.setState({ isLoading: true });
      let componentProps = {};

      if (Component.getInitialProps) {
        componentProps = await Component.getInitialProps();
      }

      this.setState({ ...componentProps, isLoading: false });

      const { location } = this.props;
      const page = location ? location.pathname : '';

      trackRoute(page);
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };
