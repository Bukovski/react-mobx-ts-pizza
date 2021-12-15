import axios from "axios";
import { action, makeObservable, observable } from "mobx";
import { IPizzasJson, IPizzasStore } from "../types/pizzas.type";
import { IFiltersSortByState } from "../types/filters.type";


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

  }

  async fetchPizzas(sortBy: IFiltersSortByState, category: null | number) {
    this.isLoaded = true;
    this.error = "";

    const url = `/db/pizzas?${
      (category === null)
        ? ''
        : `category=${ category }`
    }&_sort=${ sortBy.type }&_order=${ sortBy.order }`;

    try {
      const response = await axios.get(url);
      const { data } = response;

      this.setPizzas(data);
    } catch (error) {
      this.failLoaded("Не получилось загрузить данные. Попробуйте позже");
    }
  }

  setPizzas(pizzas: IPizzasJson[]) {
    this.isLoaded = true;
    this.items = pizzas;
  }

  failLoaded(error: string) {
    this.isLoaded = false;
    this.error = error;
  }
};