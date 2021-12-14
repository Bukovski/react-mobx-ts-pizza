export interface IFiltersSortByState {
    type: string,
    order: string
}
export interface IFiltersStore {
    category: null | number,
    // sortBy: IFiltersSortByState
    sortBy: string
}

