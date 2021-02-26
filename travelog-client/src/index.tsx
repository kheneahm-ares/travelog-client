import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import storeConfigs from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import 'semantic-ui-css/semantic.min.css'
import dateFnsLocalizer from 'react-widgets-date-fns';
import 'react-widgets/dist/css/react-widgets.css';


dateFnsLocalizer();

export const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={storeConfigs().store}>
    <PersistGate loading={null} persistor={storeConfigs().persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
