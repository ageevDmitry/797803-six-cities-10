import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeFilterType} from '../../store/offers-ui/offers-ui';
import {getFilterType} from '../../store/offers-ui/selectors';
import {CITIES} from '../../const';
import {Link} from 'react-router-dom';

function FilterCities (): JSX.Element {

  const dispatch = useAppDispatch();
  const filterType = useAppSelector(getFilterType);

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((item) => (
        <li key = {item} className="locations__item">
          <Link to="/" className={`locations__item-link tabs__item ${item === filterType ? 'tabs__item--active' : ''}`}
            onClick={() => {
              dispatch(changeFilterType({city: item}));
            }}
          >
            <span>{item}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default FilterCities;
