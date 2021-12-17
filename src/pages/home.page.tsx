import React, { useCallback, useEffect } from 'react';
import { inject, observer } from "mobx-react";

import { Categories, PizzaBlock, PizzaLoadingBlock, SortPopup, ErrorIndicator } from '../components';

import { IFiltersSortByState, IFiltersStore } from "../types/filters.type";
import { IPizzasBlockNewObject, IPizzasStore } from "../types/pizzas.type";
import { ICartStore } from "../types/cart.type";


export interface ISortItems {
  name: string,
  type: string,
  order: string
}

interface IHome {
  pizzas?: IPizzasStore,
  filter?: IFiltersStore,
  cart?: ICartStore
}


export const categoryNames: string[] = [ 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые' ];
export const sortItems: ISortItems[] = [
  { name: 'популярности', type: 'popular', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавит', type: 'name', order: 'asc' },
];


const Home = inject("pizzas", "filter", "cart")(observer((props: IHome) => {

    const { items, isLoaded, error, fetchPizzas } = props.pizzas as IPizzasStore;
    const { category, sortBy } = props.filter as IFiltersStore;
    const { items: cartItems } = props.cart as ICartStore;

    useEffect(() => {
      fetchPizzas(sortBy, category);
    }, [ category, sortBy ]);


    const onSelectCategory = useCallback((index: number | null) => {
      props.filter!.setCategory(index as number);
    }, []);

    const onSelectSortType = useCallback((type: IFiltersSortByState) => {
      props.filter!.setSortBy(type);
    }, []);

    const handleAddPizzaToCart = useCallback((newObj: IPizzasBlockNewObject) => {
      props.cart!.addPizzaToCart(newObj);
    }, []);

    const countPizzaOnId = (id: number) => cartItems.reduce((sum, item) => {
      return (item.id === id)
        ? sum + item.countItem
        : sum;
    }, 0)

    // create error for test
    // @ts-ignore
    // const foo = bar;

    return (
      <div className="container">
        <div className="content__top">
          <Categories
            activeCategory={ category }
            onClickCategory={ onSelectCategory }
            items={ categoryNames }
          />

          <SortPopup
            activeSortType={ sortBy.type }
            items={ sortItems }
            onClickSortType={ onSelectSortType }
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>

        { (error.length)
          ? <ErrorIndicator>{ error }</ErrorIndicator>
          : <div className="content__items">
            { isLoaded
              ? items.map((obj) => (
                <PizzaBlock
                  onClickAddPizza={ handleAddPizzaToCart }
                  addedCount={ countPizzaOnId(obj.id) }
                  { ...obj }
                  key={ obj.id }
                />
              ))
              : Array(12).fill(0)
                .map((_, index) => <PizzaLoadingBlock key={ index }/>)
            }
          </div>
        }
      </div>
    )
  })
)


export default Home;