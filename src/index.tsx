import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { UpdateButton } from './components/updateButton';
import { modalSetup } from './components/common/dialog/baseDialog';
import { DependencyInjectionProvider } from './integration/dependencyInjection';
import { initLocalization } from './integration/i18n';
import { initAnalytics } from './integration/analytics';
import { updateServiceWorker } from './integration/serviceWorker';
import { getJSON, defaultConfig } from './utils';

import { loadStateFromLocalStorage, saveStateToLocalStorage } from './redux/stateFromLocalStorage';
import { reducer } from './redux';

import * as serviceWorker from './serviceWorker';

import './index.scss';
import 'react-tippy/dist/tippy.css';
import 'react-vertical-timeline-component/style.min.css';

declare global {
    interface Window { config: any; registration: any }
}

const reactAppId = 'nms-app';

let persistedState: any = loadStateFromLocalStorage();
persistedState.settingReducer.menuIsVisible = false;

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
    modalSetup(reactAppId)

    ReactDOM.render(
        <DependencyInjectionProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                    <ToastContainer newestOnTop={false} theme="colored" />
                </BrowserRouter>
            </Provider>
        </DependencyInjectionProvider>
        , document.getElementById(reactAppId));

    if (window.config.useServiceWorker) {
        serviceWorker.register({
            onUpdate: registration => {
                toast.info(<UpdateButton onClick={() => updateServiceWorker(registration)} />, {
                    autoClose: false,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        });
    }
})

