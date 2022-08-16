import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {loadOffers,
  loadPropertyOffer,
  loadNearbyOffers,
  loadReviews,
  sendNewReview} from './action';
import {Offer} from '../types/offer';
import {Review, UserReview} from '../types/review.js';
import {APIRoute, AuthorizationStatus, AppRoute} from '../const';
import {setDataLoadedStatus, filterCity, requireAuthorization, redirectToRoute, loadUserData} from './action';
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
      dispatch(setDataLoadedStatus(true));
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(loadOffers(data));
      dispatch(setDataLoadedStatus(false));
      dispatch(filterCity());
    },
  );

export const fetchPropertyOffersAction = createAsyncThunk<void, number, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchPropertyOffer',
    async (id, {dispatch, extra: api}) => {
      const {data} = await api.get<Offer>(`/hotels/${id}`);
      dispatch(loadPropertyOffer(data));
    },
  );

export const fetchNearbyOffersAction = createAsyncThunk<void, number, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchNearbyOffer',
    async (id, {dispatch, extra: api}) => {
      const {data} = await api.get<Offer[]>(`/hotels/${id}/nearby`);
      dispatch(loadNearbyOffers(data));
    },
  );

export const loadReviewsAction = createAsyncThunk<void, number, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchReviews',
    async (id, {dispatch, extra: api}) => {
      const {data} = await api.get<Review[]>(`/comments/${id}`);
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
      const {data} = await api.post<Review[]>(`/comments/${userReview.propertyOfferId}`, userReview.newComment);
      dispatch(sendNewReview(data));
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
        await api.get(APIRoute.Login);
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
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
    },
  );
