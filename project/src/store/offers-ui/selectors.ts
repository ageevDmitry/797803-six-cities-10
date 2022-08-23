import {NameSpace, SortType} from '../../const';
import {State} from '../../types/state';
import {City} from '../../types/city';
import {createSelector} from '@reduxjs/toolkit';
import {Offer} from '../../types/offer';

const getOffers = (state: State): Offer[] => state[NameSpace.OffersData].offers;
export const getFilterType = (state: State): string => state[NameSpace.OffersUI].filterType;
export const getSortType = (state: State): string => state[NameSpace.OffersUI].sortType.type;
export const getMapCity = (state: State): City | undefined => state[NameSpace.OffersUI].mapCity;

export const getFilteredOffers = createSelector(
  [getOffers, getFilterType],
  (offers: Offer[], filterType: string) => {
    offers.filter((item: Offer) => item.city.name === filterType);
  }
);

export const getSortedOffers = createSelector(
  [getOffers, getSortType],
  (offers: Offer[], sortType: string) => {
    const sortItems = offers.slice();

    switch(sortType) {
      case SortType.PriceHight:
        return sortItems.sort((a, b) => a.price - b.price);
      case SortType.PriceLow:
        return sortItems.sort((a, b) => b.price - a.price);
      case SortType.Rated:
        return sortItems.sort((a, b) => b.rating - a.rating);
      default:
        return offers;
    }
  }
);
