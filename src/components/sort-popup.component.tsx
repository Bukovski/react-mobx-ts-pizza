import React from 'react';
import useComponentVisible from "../hooks/useComponentVisible";

import { ISortItems } from "../pages/home.page";
import { IFiltersSortByState } from "../types/filters.type";


interface ISortPopup {
  items: ISortItems[],
  activeSortType: string,
  onClickSortType: (type: IFiltersSortByState) => void
}


const SortPopup = React.memo((props: ISortPopup) => {
  const { items, activeSortType, onClickSortType } = props;

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  const activeLabel = items.find((obj) => obj.type === activeSortType)?.name;


  const toggleVisiblePopup = () => setIsComponentVisible(!isComponentVisible);

  const onSelectItem = (index : ISortItems) => {
    if (onClickSortType) {
      onClickSortType(index);
    }
    setIsComponentVisible(false);
  };


  return (
    <div ref={ ref } className="sort">
      <div className="sort__label">
        <svg
          className={ isComponentVisible ? 'rotated' : '' }
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span data-testid="sort-visible" onClick={ toggleVisiblePopup }>{ activeLabel }</span>
      </div>
      { isComponentVisible &&
      (
        <div data-testid="sort-popup" className="sort__popup">
          <ul>
            { items &&
            items.map((itemObj, index) => (
              <li
                data-testid="sort-popup-item"
                onClick={ () => onSelectItem(itemObj) }
                className={ activeSortType === itemObj.type ? 'active' : '' }
                key={ `${ itemObj.type }_${ index }` }>
                { itemObj.name }
              </li>
            )) }
          </ul>
        </div>
      )
      }
    </div>
  );
})


export default SortPopup;