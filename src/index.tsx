import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from './pages/Home';
import * as serviceWorker from './serviceWorker';

// Global CSS
import { Global } from '@emotion/core';
import { global } from './styles/global';

// Baseline CSS files
import 'sanitize.css';
import 'sanitize.css/typography.css';

// We only have one single route, so there is no need for a router.
// Should we need to split the app into more routes, we should add
// a router, such as react-router, or @reach/router
ReactDOM.render(
  <>
    <Global styles={global} />
    <Home />
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
