import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import axios from "axios";

import { Cart, Home } from "./pages";
import Header from "./components/Header";

import { IPizzasJson } from "./types";


function App() {
  const [ pizzas, setPizzas ] = useState<IPizzasJson[]>([] as IPizzasJson[]);

  useEffect(() => {
    axios.get('db.json').then(({ data }) => {
      setPizzas(data.pizzas);
    });
  }, []);


  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/" render={() => <Home items={ pizzas } />} exact />
        <Route path="/cart" component={ Cart } exact />
      </div>
    </div>
  );
}

export default App;