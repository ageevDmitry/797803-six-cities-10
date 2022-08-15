import {Offer} from '../types/offer';
import {City} from '../types/city';
import {SortType} from '../const';
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
