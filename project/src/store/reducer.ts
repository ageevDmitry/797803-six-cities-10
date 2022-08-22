import {createReducer} from '@reduxjs/toolkit';
import {changeFilterType,
  changeSortType,
  selectOffer,
  loadOffers,
  loadUserData,
  loadPropertyOffer,
  loadNearbyOffers,
  loadReviews,
  sendNewReview,
  setDataLoadedStatus,
  requireAuthorization,
  setErrorStatus,
  loadFavoriteOffers,
} from './action';
import {Offer} from '../types/offer';
import {Review} from '../types/review';
import {City} from '../types/city';
import {SortType} from '../types/sort-type';
import {MAP_CITIES} from '../mocks/map-cities';
import {DEFAULT_FILTER_TYPE, DEFAULT_SORT_TYPE} from '../const';
import {
  getFilterCity,
  getHoverOffer,
  getSortReviews,
} from '../utils';
import {AuthorizationStatus} from '../const';
import {UserData} from '../types/user-data';

type InitialState = {
  offers: Offer[],
  filterType: string,
  sortType: SortType,
  selectedOffer?: Offer,
  propertyOffer?: Offer,
  nearbyOffers?: Offer[],
  favoriteOffers: Offer[],
  reviews?: Review[],
  mapCity: City | undefined,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  isError: boolean,
  userData: UserData | null,
}

const initialState: InitialState = {
  offers: [],
  filterType: DEFAULT_FILTER_TYPE,
  sortType: DEFAULT_SORT_TYPE,
  favoriteOffers: [],
  mapCity: getFilterCity(MAP_CITIES, DEFAULT_FILTER_TYPE),
  authorizationStatus : AuthorizationStatus.Unknown,
  isDataLoaded: false,
  isError: false,
  userData: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeFilterType, (state, action) => {

      state.filterType = action.payload.city;
      state.mapCity = getFilterCity(MAP_CITIES, action.payload.city);
    })
    .addCase(changeSortType, (state, action) => {

      state.sortType = action.payload.sortType;
    })
    .addCase(selectOffer, (state, action) => {

      state.selectedOffer = getHoverOffer(state.offers, action.payload.selectedOfferId);
    })
    .addCase(loadOffers, (state, action) => {

      state.offers = action.payload;
    })
    .addCase(loadPropertyOffer, (state, action) => {

      state.propertyOffer = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {

      state.nearbyOffers = action.payload;
    })
    .addCase(loadReviews, (state, action) => {

      state.reviews = getSortReviews(action.payload);
    })
    .addCase(sendNewReview, (state, action) => {

      state.reviews = getSortReviews(action.payload);
    })
    .addCase(loadFavoriteOffers, (state, action) => {

      state.favoriteOffers = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {

      state.isDataLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {

      state.authorizationStatus = action.payload;
    })
    .addCase(loadUserData, (state, action) => {

      state.userData = action.payload;
    })
    .addCase(setErrorStatus, (state, action) => {

      state.isError = action.payload;
    });
});

export {reducer};
