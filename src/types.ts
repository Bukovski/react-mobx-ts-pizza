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
export interface IPizzasJsonDB {
  pizzas: IPizzasJson[];
}

