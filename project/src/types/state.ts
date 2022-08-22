import {store} from '../store';
import {AuthorizationStatus} from '../const';
import {UserData} from '../types/user-data';
import {Offer} from '../types/offer';
import {Review} from './review';
import {SortType} from './sort-type';
import {City} from './city';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userData: UserData | null,
};

export type OffersData = {
    offers: Offer[],
    propertyOffer?: Offer,
    nearbyOffers?: Offer[],
    favoriteOffers: Offer[],
    reviews?: Review[],
    isDataLoaded: boolean,
    isError: boolean,
};

export type OffersUI = {
    filterType: string,
    sortType: SortType,
    selectedOffer?: Offer,
    mapCity: City | undefined,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
