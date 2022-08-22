import {createReducer} from '@reduxjs/toolkit';
import {changeFilterType,
  changeSortType,
  selectOffer,
} from './action';
import {Offer} from '../types/offer';
import {City} from '../types/city';
import {SortType} from '../types/sort-type';
import {MAP_CITIES} from '../mocks/map-cities';
import {DEFAULT_FILTER_TYPE, DEFAULT_SORT_TYPE} from '../const';
import {
  getFilterCity,
  getHoverOffer,
} from '../utils';

type InitialState = {
  filterType: string,
  sortType: SortType,
  selectedOffer?: Offer,
  mapCity: City | undefined,
}

const initialState: InitialState = {
  filterType: DEFAULT_FILTER_TYPE,
  sortType: DEFAULT_SORT_TYPE,
  mapCity: getFilterCity(MAP_CITIES, DEFAULT_FILTER_TYPE),
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
    });
});

export {reducer};
