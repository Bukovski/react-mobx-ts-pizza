import { ICartItem, ICartStore } from "../types/cart.type";
import { action, makeObservable, observable, toJS } from "mobx";
import { isEqualObjects } from "../utils/equals";
import { getTotalCount, getTotalPrice } from "../utils/counters";



const carryTotalCountPrice = <T extends Function, O extends Function>(fn1: T, fn2: O) => (items: ICartItem[]) => {
  const totalCount = fn1(items);
  const totalPrice = fn2(items, totalCount)

  return { totalCount, totalPrice }
}

const carryCountPrice = carryTotalCountPrice(getTotalCount, getTotalPrice);



class CartStore implements ICartStore {
  items: ICartItem[];
  totalPrice: number;
  totalCount: number;

  constructor() {
    this.items = [];
    this.totalPrice = 0;
    this.totalCount = 0;

    makeObservable(this, {
      items: observable,
      totalPrice: observable,
      totalCount: observable,

      // toggleIsDone: computed,

      addPizzaToCart: action,
      // removeCartItem: action,
      // plusCartItem: action,
      // minusCartItem: action,
      clearCart: action,
    });
  }

  addPizzaToCart(newObj: ICartItem) {
    const cartItem = toJS(this.items);

    const findItemIndexCart = cartItem.findIndex(
      (item) => isEqualObjects(item, newObj, "countItem")
    );

    const currentPizzaItems = (findItemIndexCart === -1)
      ? [ ...cartItem, { ...newObj, countItem: 1 } ]
      : cartItem.map((item, index) => {

        return (index === findItemIndexCart)
          ? { ...item, countItem: item.countItem + 1 }
          : item;
      })

    this.items = currentPizzaItems;

    const { totalCount, totalPrice } = carryCountPrice(currentPizzaItems)

    this.totalCount = totalCount;
    this.totalPrice = totalPrice;
  }

  // removeCartItem() {
  //   const newItems = [ ...state.items ];
  //   const currentTotalPrice = newItems[ action.payload ].totalPrice;
  //   const currentTotalCount = newItems[ action.payload ].items.length;
  //
  //   delete newItems[ action.payload ];
  //
  //   return {
  //     ...state,
  //     items: newItems,
  //     totalPrice: state.totalPrice - currentTotalPrice,
  //     totalCount: state.totalCount - currentTotalCount,
  //   };
  // }
  //
  // plusCartItem() {
  //   const newObjItems = [
  //     ...state.items[ action.payload ].items,
  //     state.items[ action.payload ].items[0],
  //   ];
  //   const newItems = {
  //     ...state.items,
  //     [ action.payload ]: {
  //       items: newObjItems,
  //       totalPrice: getTotalPrice(newObjItems),
  //     },
  //   };
  //
  //   const totalCount = getTotalSum(newItems, 'items.length');
  //   const totalPrice = getTotalSum(newItems, 'totalPrice');
  //
  //   return {
  //     ...state,
  //     items: newItems,
  //     totalCount,
  //     totalPrice,
  //   };
  // }
  //
  // minusCartItem() {
  //   const oldItems = state.items[ action.payload ].items;
  //   const newObjItems = oldItems.length > 1
  //     ? state.items[ action.payload ].items.slice(1)
  //     : oldItems;
  //
  //   const newItems = {
  //     ...state.items,
  //     [ action.payload ]: {
  //       items: newObjItems,
  //       totalPrice: getTotalPrice(newObjItems),
  //     },
  //   };
  //
  //   const totalCount = getTotalSum(newItems, 'items.length');
  //   const totalPrice = getTotalSum(newItems, 'totalPrice');
  //
  //   return {
  //     ...state,
  //     items: newItems,
  //     totalCount,
  //     totalPrice,
  //   };
  // }

  clearCart() {
    this.totalPrice = 0;
    this.totalCount = 0;
    this.items = [];
  }
};


export default CartStore;