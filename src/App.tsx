import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import { Cart, Home } from "./pages";
import { Header } from "./components";

import { IPizzasStore } from "./types/pizzas.type";
import { inject, observer } from "mobx-react";


interface IApp {
  pizzas?: IPizzasStore
}

const App = inject("pizzas")(observer((props: IApp) => {
    const { items, fetchPizzas } = props.pizzas!;

    useEffect(() => {
      fetchPizzas();
    }, []);


    return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <Route path="/" render={ () => <Home items={ items } /> } exact />
          <Route path="/cart" component={ Cart } exact />
        </div>
      </div>
    );
  })
)

export default App;