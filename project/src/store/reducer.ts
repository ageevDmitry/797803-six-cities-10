import {createReducer} from '@reduxjs/toolkit';
import {changeCity, filterCity} from '../store/action';
import {offers} from '../mocks/offers';
import {MAP_CITIES} from '../mocks/map';
// import {getFilterItems} from '../utils';
import {DEFAULT_CITY} from '../const';
import {Offer} from '../types/offer';
import {City} from '../types/city';

const intialState = {
  city: DEFAULT_CITY,
  offers: offers.filter((item: Offer) => item.city.name === DEFAULT_CITY),
  mapCity: MAP_CITIES.filter((item: City) => item.title === DEFAULT_CITY),
  // mapCity: getFilterItems(MAP_CITIES, DEFAULT_CITY),
};

const reducer = createReducer(intialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {

      const choosedCity = action.payload.city;

      state.city = choosedCity;
    })
    .addCase(filterCity, (state) => {

      state.offers = offers.filter((item: Offer) => item.city.name === state.city);
      state.mapCity = MAP_CITIES.filter((item: City) => item.title === state.city);
      // state.offers = getFilterItems(offers, state.city);
      // state.mapCity = getFilterItems(MAP_CITIES, state.city);
    });
});

export {reducer};
