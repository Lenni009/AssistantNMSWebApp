import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { UpdateButton } from './components/updateButton';
import { initLocalization } from './integration/i18n';
import { initAnalytics } from './integration/analytics';
import { initUpdateNotification, updateServiceWorker } from './integration/serviceWorker';
import { getJSON, defaultConfig } from './utils';
import { applyIsDarkToBody } from './helper/bodyHelper';

import { loadStateFromLocalStorage, saveStateToLocalStorage } from './redux/stateFromLocalStorage';
import { reducer } from './redux';

import * as serviceWorker from './serviceWorker';

import './index.scss';

declare global {
    interface Window { config: any; registration: any }
}

let persistedState: any = loadStateFromLocalStorage();
persistedState.settingReducer.menuIsVisible = false;
applyIsDarkToBody(persistedState.settingReducer.isDark);

const store = createStore(
    reducer,
    persistedState,
);

store.subscribe(() => saveStateToLocalStorage(store));

window.config = window.config || {};
getJSON('/assets/config.json', (status: boolean, response: string) => {
    window.config = (status === true)
        ? response || {}
        : defaultConfig;

    if (window.config.consoleLogDebug) console.log('Config', window.config);

    initAnalytics();
    initLocalization(store.getState()?.settingReducer?.selectedLanguage ?? 'en');
    initUpdateNotification(<UpdateButton onClick={updateServiceWorker} />);

    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
        , document.getElementById('nms-app'));

    if (window.config.useServiceWorker) {
        serviceWorker.register({
            onUpdate: registration => {
                window.dispatchEvent(new Event("newContentAvailable"));
                window.registration = registration;
            }
        });
    }
})

