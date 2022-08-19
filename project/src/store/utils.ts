import {Offer} from '../types/offer';
import {City} from '../types/city';
import {Review} from '../types/review';
import {SortType} from '../const';
import dayjs from 'dayjs';

export function getFilterOffers(items: Offer[], selectedItem: string) {
  return items.filter((item: Offer) => item.city.name === selectedItem);
}

export function getFilterCity(items: City[], selectedItem: string) {
  return items.find((item) => item.title === selectedItem);
}

export function getHoverOffer(items: Offer[], selectedItem: number) {
  return items.find((item) => item.id === selectedItem);
}

export function getSortOffers(items: Offer[], sortType: string) {

  const sortItems = items.slice();

  switch(sortType) {
    case SortType.PriceHight:
      return sortItems.sort((a, b) => a.price - b.price);
    case SortType.PriceLow:
      return sortItems.sort((a, b) => b.price - a.price);
    case SortType.Rated:
      return sortItems.sort((a, b) => b.rating - a.rating);
    default:
      return items;
  }
}

export function getSortReviews(items: Review[]) {

  const sortItems = items.slice();

  return sortItems.sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
}

export function changeFavoriteOffers(items: Offer[], changedItem: Offer): Offer[] {

  const index = items.findIndex((item) => item.id === changedItem.id);

  if (index === -1) {
    items.push(changedItem);
    return items;
  }

  items = [
    ...items.slice(0, index),
    ...items.slice(index + 1),
  ];

  return items;
}
