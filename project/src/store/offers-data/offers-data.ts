import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {OffersData} from '../../types/state';
import {fetchOffersAction,
  fetchPropertyOffersAction,
  fetchNearbyOffersAction,
  loadReviewsAction,
  sendNewReviewAction,
  fetchFavoriteOffersAction,
  changeFavoriteStatusAction
} from '../api-action';
import {getSortReviews, getSelectedOffer} from '../../utils';

const initialState: OffersData = {
  offers: [],
  favoriteOffers: [],
  isDataLoading: false,
  isSuccess: false,
};

export const offersData = createSlice({
  name: NameSpace.OffersData,
  initialState,
  reducers: {
    selectOffer: (state, action) => {
      state.selectedOffer = getSelectedOffer(state.offers, action.payload.selectedOfferId);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offers = [];
      })
      .addCase(fetchPropertyOffersAction.fulfilled, (state, action) => {
        state.propertyOffer = action.payload;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(loadReviewsAction.fulfilled, (state, action) => {
        state.reviews = getSortReviews(action.payload);
      })
      .addCase(sendNewReviewAction.pending, (state) => {
        state.isDataLoading = true;
        state.isSuccess = false;

      })
      .addCase(sendNewReviewAction.fulfilled, (state, action) => {
        state.reviews = getSortReviews(action.payload);
        state.isDataLoading = false;
        state.isSuccess = true;
      })
      .addCase(sendNewReviewAction.rejected, (state) => {
        state.isDataLoading = false;
        state.isSuccess = false;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        state.propertyOffer = action.payload;
      });
  }
});

export const {selectOffer} = offersData.actions;
