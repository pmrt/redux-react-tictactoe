import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import rootReducer from './reducers';
import Game from './components/game';
import ErrorBoundary from './components/errorboundary';

import './index.css';

const store = createStore(rootReducer, /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
    <ErrorBoundary>
        <Provider store={store}>
            <Game />
        </Provider>
    </ErrorBoundary>,
    document.getElementById('root')
);