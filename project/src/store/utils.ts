import {Offer} from '../types/offer';
import {City} from '../types/city';

export function getFilterOffers(items: Offer[], selectedItem: string) {
  return items.filter((item: Offer) => item.city.name === selectedItem);
}

export function getFilterCity(items: City[], selectedItem: string) {
  return items.find((item) => item.title === selectedItem);
}
