import React from 'react';
import { Categories, PizzaBlock, SortPopup } from '../components';
import { IPizzasJson } from "../types";


interface IHome {
  items: IPizzasJson[]
}


const Home = (props: IHome) => {
  const { items } = props;

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          items={ [ 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые' ] }
        />

        <SortPopup items={ [ 'популярности', 'цене', 'алфавит' ] } />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {
          items.map((obj) => (
            <PizzaBlock key={ obj.id } { ...obj } />
          ))
        }
      </div>
    </div>
  )
}


export default Home;
