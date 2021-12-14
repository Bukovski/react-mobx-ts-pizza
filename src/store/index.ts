import { create } from "mobx-persist";

import PizzasStore from "./pizzas.store";
import FilterStore from "./filters.store";

import { IPizzasStore } from "../types/pizzas.type";
import { IFiltersStore } from "../types/filters.type";


export interface IRootStore {
  [ key: string ] : IPizzasStore | IFiltersStore
}

export const rootStore: IRootStore = {
  pizzas: new PizzasStore(),
  filter: new FilterStore(),
};

const hydrate = create({
  storage: localStorage,
  jsonify: true,
});

Object.keys(rootStore).map((val) => hydrate(val, rootStore[ val ]));