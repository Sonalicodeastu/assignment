import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Favourite from "./component/favourite/favourite";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/favourite" component={Favourite} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
