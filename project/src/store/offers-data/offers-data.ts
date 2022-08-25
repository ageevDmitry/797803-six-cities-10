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
  isError: false,
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
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoading = false;
        state.isError = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offers = [];
        state.isError = true;
        state.isDataLoading = false;
      })
      .addCase(fetchPropertyOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchPropertyOffersAction.fulfilled, (state, action) => {
        state.propertyOffer = action.payload;
        state.isDataLoading = false;
        state.isError = false;
      })
      .addCase(fetchPropertyOffersAction.rejected, (state) => {
        state.isError = true;
        state.isDataLoading = false;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isDataLoading = false;
        state.isError = false;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.isError = true;
        state.isDataLoading = false;
      })
      .addCase(loadReviewsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(loadReviewsAction.fulfilled, (state, action) => {
        state.reviews = getSortReviews(action.payload);
        state.isDataLoading = false;
        state.isError = false;
      })
      .addCase(loadReviewsAction.rejected, (state) => {
        state.isError = true;
        state.isDataLoading = false;
      })
      .addCase(sendNewReviewAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(sendNewReviewAction.fulfilled, (state, action) => {
        state.reviews = getSortReviews(action.payload);
        state.isDataLoading = false;
        state.isError = false;
      })
      .addCase(sendNewReviewAction.rejected, (state) => {
        state.isError = true;
        state.isDataLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isError = true;
        state.isDataLoading = false;
      })
      .addCase(changeFavoriteStatusAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        state.propertyOffer = action.payload;
        state.isDataLoading = false;
        state.isError = false;
      })
      .addCase(changeFavoriteStatusAction.rejected, (state) => {
        state.isError = true;
        state.isDataLoading = false;
      });
  }
});

export const {selectOffer} = offersData.actions;
