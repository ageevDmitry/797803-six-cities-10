import {createReducer} from '@reduxjs/toolkit';
import {changeCity, filterCity} from '../store/action';
import {offers} from '../mocks/offers';
// import {MAP_CITIES} from '../mocks/map';
import {getFilterItems} from '../utils';
import {DEFAULT_CITY} from '../const';

const intialState = {
  city: DEFAULT_CITY,
  offers: getFilterItems(offers, DEFAULT_CITY),
  // mapCity: getFilterItems(MAP_CITIES, DEFAULT_CITY),
};

const reducer = createReducer(intialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {

      const choosedCity = action.payload.city;

      state.city = choosedCity;
    })
    .addCase(filterCity, (state) => {

      state.offers = getFilterItems(offers, state.city);
      // state.mapCity = getFilterItems(MAP_CITIES, state.city);
    });
});

export {reducer};
