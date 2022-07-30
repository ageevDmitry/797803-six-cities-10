import {Offer} from '../src/types/offer';
import {City} from '../src/types/map';

export function getFilterItems (items: Offer[], choosedItem: string) {
// export function getFilterItems (items: Offer[] | City[], choosedItem: string) {

  // function checkItem(item: Offer | City) {
  function checkItem(item: Offer | City) {
    if (item.city.name === choosedItem) {
      return true;
    }
  }

  const filteredItems = items.filter(checkItem);

  return filteredItems;
}
