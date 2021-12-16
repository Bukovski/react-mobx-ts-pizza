import { action, makeObservable, observable, toJS } from "mobx";
import { makePersistable } from "mobx-persist-store";

import { isEqualObjects } from "../utils/equals";
import { getTotalCount, getTotalPrice } from "../utils/counters";

import { ICartItem, ICartStore } from "../types/cart.type";


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

    makePersistable(this, { name: 'mobx-store', properties: [ "items", "totalPrice", "totalCount" ], storage: window.localStorage });
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
  plusCartItem(index: number) {
    const newItems = [
      ...this.items.slice(0, index),
      {
        ...this.items[ index ],
        countItem: this.items[ index ].countItem + 1
      },
      ...this.items.slice(index + 1)
    ];

    this.items = newItems;

    const { totalCount, totalPrice } = carryCountPrice(newItems)

    this.totalCount = totalCount;
    this.totalPrice = totalPrice;
  }

  minusCartItem(index: number) {
    if (this.items[ index ].countItem > 1) {
      const newItems = [
        ...this.items.slice(0, index),
        {
          ...this.items[ index ],
          countItem: this.items[ index ].countItem - 1
        },
        ...this.items.slice(index + 1)
      ];

      this.items = newItems;

      const { totalCount, totalPrice } = carryCountPrice(newItems)

      this.totalCount = totalCount;
      this.totalPrice = totalPrice;
    }
  }

  clearCart() {
    this.totalPrice = 0;
    this.totalCount = 0;
    this.items = [];
  }
}


export default CartStore;