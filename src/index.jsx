import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css';

import AppEnter from 'src/modules/app/components/AppEnter';
import { PAGE } from 'src/constants';

import Store from './modules/store';

function initApp() {
  render(
    <Provider store={Store}>
      <AppEnter
        defaultPage={PAGE.MAIN_PAGE}
      />
    </Provider>,
    document.getElementById('react-root')
  );
}

initApp();
