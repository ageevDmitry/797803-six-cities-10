import {useAppDispatch, useAppSelector} from '../../hooks';
import {chooseCity} from '../../store/action';
import {CITIES} from '../../const';
import {Link} from 'react-router-dom';

function LocationList (): JSX.Element {

  const dispatch = useAppDispatch();
  const choosedCity = useAppSelector((state) => state.city);

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li key = {city} className="locations__item">

          <Link to="/" className={`locations__item-link tabs__item ${city === choosedCity ? 'tabs__item--active' : ''}`}
            onClick={() => {
              dispatch(chooseCity({town: city}));
            }}
          >
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default LocationList;
