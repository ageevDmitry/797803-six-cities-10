import {NameSpace, Sorting} from '../../const';
import {SortType} from '../../types/sort-type';
import {State} from '../../types/state';
import {City} from '../../types/city';
import {createSelector} from '@reduxjs/toolkit';
import {Offer} from '../../types/offer';

const getOffers = (state: State): Offer[] => state[NameSpace.OffersData].offers;
export const getFilterType = (state: State): string => state[NameSpace.OffersUI].filterType;
export const getSortType = (state: State): SortType => state[NameSpace.OffersUI].sortType;
export const getMapCity = (state: State): City | undefined => state[NameSpace.OffersUI].mapCity;

const getFilterCity = createSelector(
  [getOffers, getFilterType],
  (offers: Offer[], filterType: string) => offers.filter((item: Offer) => item.city.name === filterType)
);

export const getSortedOffers = createSelector(
  [getFilterCity, getSortType],
  (offers: Offer[], sortType: SortType) => {

    const sortedItems = offers.slice();

    switch(sortType.type) {
      case Sorting.PriceHight:
        return sortedItems.sort((a, b) => a.price - b.price);
      case Sorting.PriceLow:
        return sortedItems.sort((a, b) => b.price - a.price);
      case Sorting.Rated:
        return sortedItems.sort((a, b) => b.rating - a.rating);
      default:
        return offers;
    }
  }
);
