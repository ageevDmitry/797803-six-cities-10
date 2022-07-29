import {useAppDispatch, useAppSelector} from '../../hooks';
import {chooseCity} from '../../store/action';
import {CITIES} from '../../const';
import {Link} from 'react-router-dom';

function LocationList (): JSX.Element {

  const dispatch = useAppDispatch();
  const choosedCity = useAppSelector((state) => state.city);

  console.log(choosedCity);

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li key = {city} className="locations__item">
          <Link to="/" className="locations__item-link tabs__item"
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
