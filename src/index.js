import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/pure-min.scss';

import {
  IntlProvider
} from 'react-intl';


import * as bch from "./bchjs";

(async () => {
  const blocks = await bch.getBlocks();

  console.log(blocks);
})();


ReactDOM.render(
  <IntlProvider locale={navigator.language}>
    <App />
  </IntlProvider>
  , document.getElementById('root')
);
