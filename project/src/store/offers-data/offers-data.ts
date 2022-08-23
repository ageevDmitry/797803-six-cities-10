import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AppRoute} from '../../const';
import {OffersData} from '../../types/state';
import {fetchOffersAction,
  fetchPropertyOffersAction,
  fetchNearbyOffersAction,
  loadReviewsAction,
  sendNewReviewAction,
  fetchFavoriteOffersAction,
  changeFavoriteStatusAction
} from '../api-action';
import {redirectToRoute} from '../action';
import {getSortReviews, getHoverOffer} from '../../utils';

const initialState: OffersData = {
  offers: [],
  favoriteOffers: [],
  isDataLoaded: false,
  isError: false,
};

export const offersData = createSlice({
  name: NameSpace.OffersData,
  initialState,
  reducers: {
    selectOffer: (state, action) => {
      state.selectedOffer = getHoverOffer(state.offers, action.payload.selectedOfferId);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoaded = false;
        state.isError = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offers = [];
        redirectToRoute(AppRoute.Main);
        state.isError = true;
      })
      .addCase(fetchPropertyOffersAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchPropertyOffersAction.fulfilled, (state, action) => {
        state.propertyOffer = action.payload;
        state.isDataLoaded = false;
        state.isError = false;
      })
      .addCase(fetchPropertyOffersAction.rejected, (state) => {
        state.isError = true;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isDataLoaded = false;
        state.isError = false;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.isError = true;
      })
      .addCase(loadReviewsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(loadReviewsAction.fulfilled, (state, action) => {
        state.reviews = getSortReviews(action.payload);
        state.isDataLoaded = false;
        state.isError = false;
      })
      .addCase(loadReviewsAction.rejected, (state) => {
        state.isError = true;
      })
      .addCase(sendNewReviewAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(sendNewReviewAction.fulfilled, (state, action) => {
        state.reviews = getSortReviews(action.payload);
        state.isDataLoaded = false;
        state.isError = false;
      })
      .addCase(sendNewReviewAction.rejected, (state) => {
        state.isError = true;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isDataLoaded = false;
        state.isError = false;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isError = true;
      })
      .addCase(changeFavoriteStatusAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        fetchOffersAction();
        fetchFavoriteOffersAction();
        state.propertyOffer = action.payload;
        state.isDataLoaded = false;
        state.isError = false;
      })
      .addCase(changeFavoriteStatusAction.rejected, (state) => {
        state.isError = true;
      });
  }
});

export const {selectOffer} = offersData.actions;
