import { ICartItem } from "../types/cart.type";

export const isEqualObjects = <T extends ICartItem, O extends T>(object1: T, object2: O, keyException: keyof T): boolean => {
  const props1 = Object.getOwnPropertyNames(object1) as (keyof T)[];

  for (let i = 0; i < props1.length; i += 1) {
    const propKey: keyof T = props1[ i ];

    if (
      object1[ propKey ] !== object2[ propKey ]
      && keyException !== propKey
    ) {
      return false;
    }
  }

  return true;
}
