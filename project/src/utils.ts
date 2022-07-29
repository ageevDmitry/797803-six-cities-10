import {Offer} from '../src/types/offer';

export function getFilterOffers (offers: Offer[], choosedCity: string) {

  function checkOffer(offer: Offer) {
    if (offer.city.name === choosedCity) {
      return true;
    }
  }

  const filteredOffers = offers.filter(checkOffer);

  return filteredOffers;
}
