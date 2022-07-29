import {createReducer} from '@reduxjs/toolkit';
import {chooseCity} from '../store/action';
// import {offers} from '../mocks/offers';

const intialState = {
  city: 'Paris',
  // offers: offers,
};

const reducer = createReducer(intialState, (builder) => {
  builder
    .addCase(chooseCity, (state, action) => {

      const choosedCity = action.payload.town;

      state.city = choosedCity;
    });
});

export {reducer};
