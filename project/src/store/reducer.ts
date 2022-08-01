import {createReducer} from '@reduxjs/toolkit';
import {changeCity, filterCity} from './action';
import {OFFERS} from '../mocks/offers';
import {MAP_CITIES} from '../mocks/map';
import {reviews} from '../mocks/reviews';
import {DEFAULT_CITY} from '../const';
import {getFilterOffers, getFilterCity} from './utils';

const intialState = {
  city: DEFAULT_CITY,
  offers: getFilterOffers(OFFERS, DEFAULT_CITY),
  reviews: reviews,
  mapCity: getFilterCity(MAP_CITIES, DEFAULT_CITY),
};

const reducer = createReducer(intialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {

      const selectedCity = action.payload.city;

      state.city = selectedCity;
    })
    .addCase(filterCity, (state) => {

      state.offers = getFilterOffers(OFFERS, state.city);
      state.mapCity = getFilterCity(MAP_CITIES, state.city);
    });
});

export {reducer};
