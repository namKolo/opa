import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';
import createStore from 'store';

const appStore = createStore();

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={appStore}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('main')
  );
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
