import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {loadOffers,
  loadPropertyOffer,
  loadNearbyOffers,
  loadReviews,
  sendNewReview,
  setDownloadError,
} from './action';
import {Offer, FavoritesTypeOffer} from '../types/offer';
import {Review, UserReview} from '../types/review.js';
import {APIRoute, AuthorizationStatus, AppRoute} from '../const';
import {setDataLoadedStatus,
  requireAuthorization,
  redirectToRoute,
  loadUserData,
  loadFavoriteOffers,
} from './action';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {saveToken, dropToken} from '../services/token';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchOffers',
    async (_arg, {dispatch, extra: api}) => {
      try {
        const {data} = await api.get<Offer[]>(APIRoute.Offers);
        dispatch(loadOffers(data));
        dispatch(setDownloadError(false));
      } catch {
        dispatch(loadOffers([]));
        dispatch(redirectToRoute(AppRoute.Main));
        dispatch(setDownloadError(true));
      }
    },
  );

export const fetchPropertyOffersAction = createAsyncThunk<void, string | number, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchPropertyOffer',
    async (id, {dispatch, extra: api}) => {
      try {
        const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
        dispatch(loadPropertyOffer(data));
      } catch {
        dispatch(redirectToRoute(AppRoute.NotFound));
      }
    },
  );

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchNearbyOffer',
    async (id, {dispatch, extra: api}) => {
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
      dispatch(loadNearbyOffers(data));
    },
  );

export const loadReviewsAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchReviews',
    async (id, {dispatch, extra: api}) => {
      const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
      dispatch(loadReviews(data));
    },
  );

export const sendNewReviewAction = createAsyncThunk<void, UserReview, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/sendReview',
    async (userReview, {dispatch, extra: api}) => {
      dispatch(setDataLoadedStatus(true));
      const {data} = await api.post<Review[]>(`${APIRoute.Comments}/${userReview.propertyOfferId}`, userReview.newComment);
      dispatch(setDataLoadedStatus(false));
      dispatch(sendNewReview(data));
    },
  );

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchFavoriteOffers',
    async (_arg, {dispatch, extra: api}) => {
      const {data} = await api.get<Offer[]>(APIRoute.Favorite);
      dispatch(loadFavoriteOffers(data));
    },
  );

export const changeFavoriteStatusAction = createAsyncThunk<void, FavoritesTypeOffer, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/changeFavoriteStatusOffer',
  async (changedOffer, {dispatch, extra: api}) => {
    await api.post<Offer>(`${APIRoute.Favorite}/${changedOffer.id}/${changedOffer.favoriteStatus}`);
    dispatch(fetchOffersAction());
    dispatch(fetchFavoriteOffersAction());
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'user/checkAuth',
    async (_arg, {dispatch, extra: api}) => {
      try {
        const {data} = await api.get<UserData>(APIRoute.Login);
        dispatch(loadUserData(data));
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
        dispatch(fetchFavoriteOffersAction());
      } catch {
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      }
    },
  );

export const loginAction = createAsyncThunk<void, AuthData, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'user/login',
    async ({login: email, password}, {dispatch, extra: api}) => {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
      dispatch(loadUserData(data));
      dispatch(fetchOffersAction());
      dispatch(fetchFavoriteOffersAction());
    },
  );

export const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'user/logout',
    async (_arg, {dispatch, extra: api}) => {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(fetchOffersAction());
      dispatch(fetchFavoriteOffersAction());
    },
  );
