import { IFiltersSortByState } from "./filters.type";

export interface IPizzasJson {
    id: number;
    imageUrl: string;
    name: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
}

export interface IPizzasBlockNewObject {
    id : number,
    name : string,
    imageUrl : string,
    price : number,
    size : number,
    type : string
}


export interface IPizzasStore {
    items: IPizzasJson[],
    isLoaded: boolean,
    error: string,
    fetchPizzas(sortBy: IFiltersSortByState, category: null | number): void,
    setPizzas(pizzas: IPizzasJson[]): void,
    failLoaded(error: string): void
}

