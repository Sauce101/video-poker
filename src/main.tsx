import React from 'react';
import ReactDOM from 'react-dom/client';
// import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import './index.css';
// import { deckOfCardsApi } from './api/apiSlice';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ApiProvider api={deckOfCardsApi}> */}
      <App />
      {/* </ApiProvider> */}
    </Provider>
  </React.StrictMode>
);
