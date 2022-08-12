import {createReducer} from '@reduxjs/toolkit';
import {changeCity, filterCity, loadOffers, setDataLoadedStatus, requireAuthorization, setError, loadUserData} from './action';
import {Offer} from '../types/offer';
import {Review} from '../types/review';
import {City} from '../types/city';
import {MAP_CITIES} from '../mocks/map-cities';
import {reviews} from '../mocks/reviews';
import {DEFAULT_CITY} from '../const';
import {getFilterOffers, getFilterCity} from './utils';
import {AuthorizationStatus} from '../const';
import {UserData} from '../types/user-data';

type InitialState = {
  city: string,
  offers: Offer[],
  filterOffers: Offer[],
  reviews: Review[],
  mapCity: City | undefined,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  error: string | null,
  userData: UserData | null,
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  filterOffers: [],
  reviews: reviews,
  mapCity: getFilterCity(MAP_CITIES, DEFAULT_CITY),
  authorizationStatus : AuthorizationStatus.Unknown,
  isDataLoaded: false,
  error: null,
  userData: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {

      const selectedCity = action.payload.city;

      state.city = selectedCity;
    })
    .addCase(filterCity, (state) => {

      state.filterOffers = getFilterOffers(state.offers, state.city);
      state.mapCity = getFilterCity(MAP_CITIES, state.city);
    })
    .addCase(loadOffers, (state, action) => {

      state.offers = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {

      state.isDataLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {

      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {

      state.error = action.payload;
    })
    .addCase(loadUserData, (state, action) => {

      state.userData = action.payload;
    });
});

export {reducer};
