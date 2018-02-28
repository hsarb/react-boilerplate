// @flow
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AppFrame from '../AppFrame';
import asyncRoute from '../../utils/asyncRoute';
import deepPurple from 'material-ui/colors/deepPurple';
import grey from 'material-ui/colors/grey';
import Helmet from 'react-helmet';
import React from 'react';
import Reboot from 'material-ui/Reboot';

const Home = asyncRoute(() => import('../../views/Home'));

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: grey,
      secondary: deepPurple,
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Reboot />
      <Helmet title="React-Boilerplate" />
      <Router>
        <AppFrame>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </AppFrame>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
