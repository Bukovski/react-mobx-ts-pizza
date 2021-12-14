import { action, computed, makeObservable, observable } from "mobx";
import { IFiltersStore } from "../types/filters.type";


export default class FilterStore implements IFiltersStore {
  category : number;
  sortBy : string;

  constructor() {
    this.category = 0;
    this.sortBy = 'popular';

    makeObservable(this, {
      category: observable,
      sortBy: observable,

      // toggleIsDone: computed,

      setSortBy: action,
      setCategory: action,
    });
  }

  setSortBy(sort: string) {
    this.sortBy = sort;
  };

  setCategory(category: number) {
    this.category = category
  };
};