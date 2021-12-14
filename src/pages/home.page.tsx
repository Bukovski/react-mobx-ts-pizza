import React from 'react';
import { Categories, PizzaBlock, SortPopup } from '../components';
import { IPizzasJson } from "../types/pizzas.type";


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

        <SortPopup
          items={ [
            { name: 'популярности', type: 'popular' },
            { name: 'цене', type: 'price' },
            { name: 'алфавит', type: 'alphabet' },
          ] }
        />
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
