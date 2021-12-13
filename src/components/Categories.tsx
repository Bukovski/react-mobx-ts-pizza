import React, { useState } from 'react';


interface ICategories {
  items: string[]
}


const Categories = (props: ICategories) => {
  const { items } = props;

  const [ activeItem, setActiveItem ] = useState<number|null>(null);

  const onSelectItem = (index: number|null): void => {
    setActiveItem(index);
  };

  return (
    <div className="categories">
      <ul>
        <li
          className={ activeItem === null ? 'active' : '' }
          onClick={ () => onSelectItem(null) }
        >
          Все
        </li>
        { items &&
          items.map((name, index) => (
            <li
              className={ activeItem === index ? 'active' : '' }
              onClick={ () => onSelectItem(index) }
              key={ `${ name }_${ index }` }>
              { name }
            </li>
          ))
        }
      </ul>
    </div>
  );
}


export default Categories;