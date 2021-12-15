import React from 'react';


interface ICategories {
  items: string[],
  activeCategory: null | number,
  onClickCategory: (index: number | null) => void
}

const Categories = React.memo((props: ICategories) => {
  const {
    items = [],
    activeCategory = null,
    onClickCategory = () => {}
  } = props;

  return (
    <div className="categories">
      <ul>
        <li
          data-testid="categories-item"
          className={ activeCategory === null ? 'active' : '' }
          onClick={ () => onClickCategory(null) }
        >
          Все
        </li>
        { items &&
          items.map((name, index) => (
            <li
              data-testid="categories-item"
              className={ activeCategory === index ? 'active' : '' }
              onClick={ () => onClickCategory(index) }
              key={ `${ name }_${ index }` }>
              { name }
            </li>
          ))
        }
      </ul>
    </div>
  );
})



export default Categories;