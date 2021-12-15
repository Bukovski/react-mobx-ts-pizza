export interface IFiltersSortByState {
    type: string,
    order: string
}

export interface IFiltersStore {
    category: null | number,
    sortBy: IFiltersSortByState
    setSortBy(sort: IFiltersSortByState): void
    setCategory(category: number): void
};
