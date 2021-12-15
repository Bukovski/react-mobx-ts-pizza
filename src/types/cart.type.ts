import { IPizzasBlockNewObject } from "./pizzas.type";


export interface ICartItem extends IPizzasBlockNewObject {
  countItem: number
}

export interface ICartState {
  items : ICartItem[],
  totalPrice : number,
  totalCount : number,
}

export interface ICartStore extends ICartState {
  addPizzaCart(newObj: IPizzasBlockNewObject): void,
  clearCart(): void,
}

