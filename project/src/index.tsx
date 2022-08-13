import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {store} from './store';
import {fetchOffersAction} from './store/api-action';
import {ToastContainer} from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(fetchOffersAction());

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ToastContainer />
      <App/>
    </Provider>
  </React.StrictMode>,
);
