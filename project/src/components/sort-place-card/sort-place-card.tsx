import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeSortType, sortOffers} from '../../store/action';
import {SORT_LIST} from '../../const';
import {useState} from 'react';

function SortPlaceCard ():JSX.Element {

  const [isSortList, callSortList] = useState(false);

  const dispatch = useAppDispatch();
  const selectedSortType = useAppSelector((state) => state.sortType);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by
      </span>

      <span className="places__sorting-type" tabIndex={0}
        onClick={() => {
          callSortList(!isSortList);
        }}
      >
        {selectedSortType.title}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      {isSortList &&
      <ul className="places__options places__options--custom places__options--opened">
        {SORT_LIST.map((item) => (
          <li key = {item.title} className={`places__option ${item.type === selectedSortType.type ? 'places__option--active' : ''}`} tabIndex={0}
            onClick={() => {
              dispatch(changeSortType({sortType: item}));
              callSortList(!isSortList);
              dispatch(sortOffers());
            }}
          >
            {item.title}
          </li>
        ))}
      </ul>}
    </form>
  );
}

export default SortPlaceCard;
