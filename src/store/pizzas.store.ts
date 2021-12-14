import axios from "axios";
import { action, computed, makeObservable, observable } from "mobx";
import { IPizzasJson, IPizzasStore } from "../types/pizzas.type";


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

      // toggleIsDone: computed,

      fetchPizzas: action.bound,
      setPizzas: action,
    });
  }

  async fetchPizzas() {
    this.isLoaded = true;

    this.error = "";

    try {
      const response = await axios.get('db.json');
      this.items = response.data.pizzas;

      this.isLoaded = false;
    } catch (error) {
      // @ts-ignore
      this.error = error;
      this.isLoaded = false;
    }
  }

  setPizzas(pizzas: IPizzasJson[]) {
    this.items.push(...pizzas);
  }
};