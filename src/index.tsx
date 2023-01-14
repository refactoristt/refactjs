import './util/handleError';
import './util/setupServiceWorker';

import React from 'react';
import DOM from 'react-dom';

import App from './App';

// import './styles/index.scss';

DOM.render(
  <App />,
  document.getElementById('root')!,
);
