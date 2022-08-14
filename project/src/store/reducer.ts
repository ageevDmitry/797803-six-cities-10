import {createReducer} from '@reduxjs/toolkit';
import {changeCity,
  filterCity,
  changeSortType,
  sortOffers,
  loadOffers,
  setDataLoadedStatus,
  requireAuthorization,
  loadUserData} from './action';
import {Offer} from '../types/offer';
import {Review} from '../types/review';
import {City} from '../types/city';
import {SortType} from '../types/sort-type';
import {MAP_CITIES} from '../mocks/map-cities';
import {reviews} from '../mocks/reviews';
import {DEFAULT_FILTER_TYPE, DEFAULT_SORT_TYPE} from '../const';
import {getFilterOffers, getFilterCity, getSortOffers} from './utils';
import {AuthorizationStatus} from '../const';
import {UserData} from '../types/user-data';

type InitialState = {
  offers: Offer[],
  filterType: string,
  filterOffers: Offer[],
  sortType: SortType,
  sortOffers: Offer[],
  reviews: Review[],
  mapCity: City | undefined,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  error: string | null,
  userData: UserData | null,
}

const initialState: InitialState = {
  filterType: DEFAULT_FILTER_TYPE,
  offers: [],
  filterOffers: [],
  sortType: DEFAULT_SORT_TYPE,
  sortOffers: [],
  reviews: reviews,
  mapCity: getFilterCity(MAP_CITIES, DEFAULT_FILTER_TYPE),
  authorizationStatus : AuthorizationStatus.Unknown,
  isDataLoaded: false,
  error: null,
  userData: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {

      state.filterType = action.payload.city;
    })
    .addCase(filterCity, (state) => {

      state.filterOffers = getFilterOffers(state.offers, state.filterType);
      state.mapCity = getFilterCity(MAP_CITIES, state.filterType);
      state.sortOffers = state.filterOffers.slice();
      state.sortType = DEFAULT_SORT_TYPE;
    })
    .addCase(changeSortType, (state, action) => {

      state.sortType = action.payload.sortType;
    })
    .addCase(sortOffers, (state) => {

      state.sortOffers = getSortOffers(state.filterOffers, state.sortType.type);
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
    .addCase(loadUserData, (state, action) => {

      state.userData = action.payload;
    });
});

export {reducer};
