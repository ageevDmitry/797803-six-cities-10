import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {DataError} from '../../types/state';
import {fetchOffersAction,
  fetchPropertyOffersAction,
  fetchFavoriteOffersAction,
  loginAction,
  logoutAction
} from '../api-action';

const initialState: DataError = {
  isDataError: false,
};

export const dataError = createSlice({
  name: NameSpace.DataError,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.fulfilled, (state) => {
        state.isDataError = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isDataError = true;
      })
      .addCase(fetchPropertyOffersAction.fulfilled, (state) => {
        state.isDataError = false;
      })
      .addCase(fetchPropertyOffersAction.rejected, (state) => {
        state.isDataError = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state) => {
        state.isDataError = false;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isDataError = true;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.isDataError = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isDataError = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isDataError = false;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.isDataError = true;
      });
  }
});
