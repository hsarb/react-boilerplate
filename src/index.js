// @flow
import App from './components/App';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDom from 'react-dom';

/* eslint-disable no-underscore-dangle */
const preloadedState = window.__intialState__;
const rootElement = document.getElementById('root');

delete window.__intialState__;
/* eslint-enable no-underscore-dangle */

const renderApp = () => {
  if (!(rootElement instanceof Element)) throw new Error('invalid type');

  return ReactDom.render(
    <AppContainer>
      <App data={preloadedState} />
    </AppContainer>,
    rootElement,
  );
};

if (module.hot) {
  module.hot.accept('./components/App', () => {
    renderApp();
  });
}

renderApp();
