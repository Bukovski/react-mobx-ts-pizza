import { ICartItem } from "../types/cart.type";

const countPriceItem = (obj: ICartItem) => obj.countItem * obj.price;

const getTotalPrice = (arr: ICartItem[], count: number) => arr.reduce((sum, obj) => sum = (obj.price * count) , 0);

const getTotalCount = (takeObject: ICartItem[]): number => {
  return takeObject.reduce((sum: number, obj) => {
    return obj.countItem ? obj.countItem + sum : sum;
  }, 0);
};


export {
  countPriceItem,
  getTotalPrice,
  getTotalCount
}
