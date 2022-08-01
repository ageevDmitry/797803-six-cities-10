import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity, filterCity} from '../../store/action';
import {CITIES} from '../../const';
import {Link} from 'react-router-dom';

function LocationList (): JSX.Element {

  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.city);

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((item) => (
        <li key = {item} className="locations__item">
          <Link to="/" className={`locations__item-link tabs__item ${item === selectedCity ? 'tabs__item--active' : ''}`}
            onClick={() => {
              dispatch(changeCity({city: item}));
              dispatch(filterCity());
            }}
          >
            <span>{item}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default LocationList;
