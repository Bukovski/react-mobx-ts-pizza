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
  addPizzaToCart(newObj: IPizzasBlockNewObject): void,
  clearCart(): void,
  plusCartItem(index: number): void,
  minusCartItem(index: number): void
}

