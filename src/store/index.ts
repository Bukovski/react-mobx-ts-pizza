import PizzasStore from "./pizzas.store";
import FilterStore from "./filters.store";
import CartStore from "./cart.store";

import { IPizzasStore } from "../types/pizzas.type";
import { IFiltersStore } from "../types/filters.type";
import { ICartStore } from "../types/cart.type";


export interface IRootStore {
  [ key: string ] : IPizzasStore | IFiltersStore | ICartStore
}

export const rootStore: IRootStore = {
  pizzas: new PizzasStore(),
  filter: new FilterStore(),
  cart: new CartStore(),
};

