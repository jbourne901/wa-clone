import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import {StateProvider} from "./components/state-provider/state-provider";
import reducer from "./state/reducer";
import {initialState} from "./state/types";

ReactDOM.render(
  <StateProvider reducer={reducer} initialState={initialState}>
    <App />
  </StateProvider>,
  document.getElementById('root')
);
