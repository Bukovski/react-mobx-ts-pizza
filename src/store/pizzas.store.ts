import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import { IPizzasJson, IPizzasStore } from "../types/pizzas.type";
import { makePersistable } from "mobx-persist-store";
import { IFiltersSortByState } from "../../../redux-ts-pizza/src/types/filters.type";


export default class PizzasStore implements IPizzasStore {
  items: IPizzasJson[];
  isLoaded: boolean;
  error : string;

  constructor() {
    this.items = [];
    this.isLoaded = false;
    this.error = "";

    makeObservable(this, {
      items: observable,
      isLoaded: observable,
      error: observable,

      fetchPizzas: action.bound,
      setPizzas: action,
    });
    // makePersistable(this, { name: 'mobx-store', properties: [ 'items' ], storage: window.localStorage });
  }

  async fetchPizzas(sortBy: IFiltersSortByState, category: null | number) {
    this.isLoaded = true;

    this.error = "";

    const url = `/db/pizzas?${
      (category !== null)
        ? `category=${ category }`
        : ''
    }&_sort=${ sortBy.type }&_order=${ sortBy.order }`;

    try {
      const response = await axios.get(url);

      const { data } = response.data;
      this.setPizzas(data);

    } catch (error) {
      this.failLoaded("Не получилось загрузить данные. Попробуйте позже");
    } finally {
      this.isLoaded = false;
    }
  }

  setPizzas(pizzas: IPizzasJson[]) {
    console.log(pizzas)
    this.items.push(...pizzas);
  }

  failLoaded(error: string) {
    this.error = error;
  }
};