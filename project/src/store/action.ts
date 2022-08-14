import {createAction} from '@reduxjs/toolkit';
import {UserData} from '../types/user-data';
import {Offer} from '../types/offer';
import {SortType} from '../types/sort-type';
import {AppRoute, AuthorizationStatus} from '../const';

export const changeCity = createAction<{city: string}>('city/change');

export const filterCity = createAction('city/filter');

export const changeSortType = createAction<{sortType: SortType}>('offers/changeSortType');

export const sortOffers = createAction('offers/sortOffers');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const loadUserData = createAction<UserData>('data/loadUserData');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('data/setError');

export const redirectToRoute = createAction<AppRoute>('user/redirectToRoute');
