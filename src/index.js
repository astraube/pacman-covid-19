import React from 'react';
import ReactDOM from 'react-dom';
import './commons';
import './PacmanCovid/styles/index.scss';

import PacmanCovid from './PacmanCovid';

import * as serviceWorker from './serviceWorker';

/**
 * Commons
 */
Array.prototype.random = function () {
  return this[Math.floor((Math.random()* (this.length-1) ))];
};
String.prototype.equalIgnoreCase = function(str) {
  return (str != null &&
  typeof str === 'string' &&
  this.toUpperCase() === str.toUpperCase());
};

const props = {
  autoStart: true,
  gridSize: 17,
  animate: process.env.NODE_ENV !== 'development',
  locale: 'pt',
  onEnd: () => {
    console.log('onEnd')
  }
};

function renderApp(App = PacmanCovid) {
  ReactDOM.render(
    <React.StrictMode>
      <App {...props}/>,
    </React.StrictMode>,
    document.getElementById('root')
  );
}

renderApp();

if (module.hot) {
  // eslint-disable-next-line global-require
  module.hot.accept('./PacmanCovid', () => renderApp(require('./PacmanCovid').default));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();