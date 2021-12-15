import { action, computed, makeObservable, observable } from "mobx";
import { IFiltersStore } from "../types/filters.type";
import { IFiltersSortByState } from "../../../redux-ts-pizza/src/types/filters.type";


export default class FilterStore implements IFiltersStore {
  category : null | number;
  sortBy : IFiltersSortByState;

  constructor() {
    this.category = 0;
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