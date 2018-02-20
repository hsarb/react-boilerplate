// @flow
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import newView from '../../utils/newView';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';

const styles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: 400,
  },
};

type Props = {
  classes: Object,
  message: ?string,
};

class Home extends Component<Props> {
  static async getInitialProps() {
    const message = 'React Boilerplate';

    return { message };
  }

  render() {
    const { classes, message } = this.props;

    return (
      <div className={classes.root}>
        <Helmet title="Welcome | React-Boilerplate" />
        <Typography color="inherit" variant="display1">
          {message}
        </Typography>
        <Typography color="inherit" variant="title">
          A Minimal library react boilerplate built with performance, testing, and ease of use in
          mind.
        </Typography>
      </div>
    );
  }
}

const StyledHome = withStyles(styles)(Home);

export default newView(StyledHome);
