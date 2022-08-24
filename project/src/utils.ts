import dayjs from 'dayjs';
import {Offer} from './types/offer';
import {City} from './types/city';
import {Review} from './types/review';

export function getFilterCity(items: City[], selectedItem: string) {
  return items.find((item) => item.title === selectedItem);
}

export function getSelectedOffer(items: Offer[], selectedItem: number) {
  return items.find((item) => item.id === selectedItem);
}

export function getSortReviews(items: Review[]) {

  const sortItems = items.slice();

  return sortItems.sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));
}
