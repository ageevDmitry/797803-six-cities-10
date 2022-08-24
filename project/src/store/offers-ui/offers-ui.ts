import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, DEFAULT_FILTER_TYPE, DEFAULT_SORT_TYPE, MAP_CITIES} from '../../const';
import {OffersUI} from '../../types/state';
import {getFilterCity} from '../../utils';

const initialState: OffersUI = {
  filterType: DEFAULT_FILTER_TYPE,
  sortType: DEFAULT_SORT_TYPE,
  mapCity: getFilterCity(MAP_CITIES, DEFAULT_FILTER_TYPE),
};

export const offersUI = createSlice({
  name: NameSpace.OffersUI,
  initialState,
  reducers: {
    changeFilterType: (state, action) => {
      state.filterType = action.payload.city;
      state.mapCity = getFilterCity(MAP_CITIES, action.payload.city);
      state.sortType = DEFAULT_SORT_TYPE;
    },
    changeSortType: (state, action) => {
      state.sortType = action.payload.sortType;
    }
  },
});

export const {changeFilterType, changeSortType} = offersUI.actions;
