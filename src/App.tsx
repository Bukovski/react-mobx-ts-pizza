import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Cart, Home, NotFound } from "./pages";
import { Header } from "./components";


const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Switch>
          <Route path="/" component={ Home } exact />
          <Route path="/cart" component={ Cart } exact />
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>
    </div>
  );
}

export default App;