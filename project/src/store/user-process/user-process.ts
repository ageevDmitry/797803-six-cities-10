import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus, AppRoute} from '../../const';
import {UserProcess} from '../../types/state';
import {checkAuthAction,
  loginAction,
  logoutAction,
  fetchOffersAction,
  fetchFavoriteOffersAction,
} from '../api-action';
import {redirectToRoute} from '../action';
import {saveToken, dropToken} from '../../services/token';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
};

export const userProcess = createSlice({
  name: NameSpace.UserProcess,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
        fetchFavoriteOffersAction();
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        saveToken(action.payload.token);
        state.userData = action.payload;
        redirectToRoute(AppRoute.Main);
        fetchOffersAction();
        fetchFavoriteOffersAction();
      })
      .addCase(loginAction.rejected, (state) => {
        dropToken();
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        fetchOffersAction();
        fetchFavoriteOffersAction();
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
