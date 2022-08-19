import {createReducer} from '@reduxjs/toolkit';
import {changeFilterType,
  filterCity,
  changeSortType,
  sortOffers,
  selectOffer,
  loadOffers,
  loadUserData,
  loadPropertyOffer,
  loadNearbyOffers,
  loadReviews,
  sendNewReview,
  setDataLoadedStatus,
  requireAuthorization,
  setDownloadError,
  loadFavoriteOffers,
  changeFavoriteStatusOffer,
} from './action';
import {Offer} from '../types/offer';
import {Review} from '../types/review';
import {City} from '../types/city';
import {SortType} from '../types/sort-type';
import {MAP_CITIES} from '../mocks/map-cities';
import {DEFAULT_FILTER_TYPE, DEFAULT_SORT_TYPE} from '../const';
import {getFilterOffers,
  getFilterCity,
  getHoverOffer,
  getSortOffers,
  getSortReviews,
  changeFavoriteOffers
} from './utils';
import {AuthorizationStatus} from '../const';
import {UserData} from '../types/user-data';

type InitialState = {
  offers: Offer[],
  filterType: string,
  filteredOffers: Offer[],
  sortType: SortType,
  sortedOffers: Offer[],
  selectedOffer?: Offer,
  propertyOffer?: Offer,
  nearbyOffers?: Offer[],
  favoriteOffers: Offer[],
  reviews?: Review[],
  mapCity: City | undefined,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  error: boolean,
  userData: UserData | null,
}

const initialState: InitialState = {
  offers: [],
  filterType: DEFAULT_FILTER_TYPE,
  filteredOffers: [],
  sortType: DEFAULT_SORT_TYPE,
  sortedOffers: [],
  favoriteOffers: [],
  mapCity: getFilterCity(MAP_CITIES, DEFAULT_FILTER_TYPE),
  authorizationStatus : AuthorizationStatus.Unknown,
  isDataLoaded: false,
  error: false,
  userData: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeFilterType, (state, action) => {

      state.filterType = action.payload.city;
    })
    .addCase(filterCity, (state) => {

      state.filteredOffers = getFilterOffers(state.offers, state.filterType);
      state.mapCity = getFilterCity(MAP_CITIES, state.filterType);
      state.sortedOffers = state.filteredOffers.slice();
      state.sortType = DEFAULT_SORT_TYPE;
    })
    .addCase(changeSortType, (state, action) => {

      state.sortType = action.payload.sortType;
    })
    .addCase(sortOffers, (state) => {

      state.sortedOffers = getSortOffers(state.filteredOffers, state.sortType.type);
    })
    .addCase(selectOffer, (state, action) => {

      state.selectedOffer = getHoverOffer(state.filteredOffers, action.payload.selectedOfferId);
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
    .addCase(changeFavoriteStatusOffer, (state, action) => {

      state.favoriteOffers = changeFavoriteOffers(state.favoriteOffers, action.payload);
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
    .addCase(setDownloadError, (state, action) => {

      state.error = action.payload;
    });
});

export {reducer};
