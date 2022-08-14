import {Offer} from '../types/offer';
import {City} from '../types/city';

export function getFilterOffers(items: Offer[], selectedItem: string) {
  return items.filter((item: Offer) => item.city.name === selectedItem);
}

export function getFilterCity(items: City[], selectedItem: string) {
  return items.find((item) => item.title === selectedItem);
}

export function getSortOffers(items: Offer[], sortType: string) {

  const sortItems = items.slice();

  switch(sortType) {
    case 'PriceHight':
      return sortItems.sort((a: Offer, b: Offer) => a.price - b.price);
    case 'PriceLow':
      return sortItems.sort((a: Offer, b: Offer) => b.price - a.price);
    case 'Rated':
      return sortItems.sort((a: Offer, b: Offer) => b.rating - a.rating);
    default:
      return items;
  }
}
