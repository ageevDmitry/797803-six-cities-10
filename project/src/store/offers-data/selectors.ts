import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';

export const getOffers = (state: State): Offer[] => state[NameSpace.OffersData].offers;
export const getPropertyOffer = (state: State): Offer | undefined => state[NameSpace.OffersData].propertyOffer;
export const getNearbyOffer = (state: State): Offer[] | undefined => state[NameSpace.OffersData].nearbyOffers;
export const getFavoriteOffers = (state: State): Offer[] | undefined => state[NameSpace.OffersData].favoriteOffers;
export const getReviews = (state: State): Review[] | undefined => state[NameSpace.OffersData].reviews;
export const getIsDataLoaded = (state: State): boolean => state[NameSpace.OffersData].isDataLoaded;
export const getIsError = (state: State): boolean => state[NameSpace.OffersData].isError;
