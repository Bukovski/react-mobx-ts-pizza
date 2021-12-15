import { action, makeObservable, observable } from "mobx";
import { IFiltersStore } from "../types/filters.type";
import { IFiltersSortByState } from "../types/filters.type";


export default class FilterStore implements IFiltersStore {
  category : null | number;
  sortBy : IFiltersSortByState;

  constructor() {
    this.category = null;
    this.sortBy = {
      type: 'popular',
      order: 'desc',
    };

    makeObservable(this, {
      category: observable,
      sortBy: observable,

      setSortBy: action,
      setCategory: action,
    });
  }

  setSortBy(sort: IFiltersSortByState) {
    this.sortBy = sort;
  };

  setCategory(category: number) {
    this.category = category
  };
};