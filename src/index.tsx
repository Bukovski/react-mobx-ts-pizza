import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "mobx-react";
import './main.css';
import App from './App';
import { rootStore } from "./store";


ReactDOM.render(
  <Router>
    <Provider { ...rootStore }>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
