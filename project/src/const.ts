export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Property = '/offer/:id',
  NotFound = '/404',
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum PlaceCardType {
  Cities = 'cities',
  Favorites = 'favorites',
  NearPlaces = 'near-places',
}

export enum SortType {
  PriceHight = 'PriceHight',
  PriceLow = 'PriceLow',
  Rated = 'Rated',
}

export enum FavoriteStatus {
  Favorite = 0,
  NotFavorite = 1,
}


export enum RatingWidthFactor {
  Film = 14.8,
  Review = 19.5,
  Property = 29
}

export enum OfferType {
  Apartment = 'apartment',
  Room = 'room',
  House = 'house',
  Hotel = 'hotel'
}

export enum UrlMapMarket {
  Default = 'img/pin.svg',
  Current = 'img/pin-active.svg',
}

export enum OfferStatus {
  Favorite = 1,
  NotFavorite = 0,
}

export const enum LengthComment {
  Min = 50,
  Max = 300,
}

export const PLACE_CARD_CLASS_NAME = {
  [PlaceCardType.Cities]: 'cities__places-list places__list tabs__content',
  [PlaceCardType.Favorites]: 'favorites__places',
  [PlaceCardType.NearPlaces]: 'near-places__list places__list',
};

export const VIEW_OFFER_TYPE = {
  [OfferType.Apartment]: 'Apartment',
  [OfferType.Room]: 'Private Room',
  [OfferType.House]: 'House',
  [OfferType.Hotel]: 'Hotel'
} as const;

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const SORT_LIST = [
  {
    type: 'Popular',
    title: 'Popular'
  },
  {
    type: 'PriceHight',
    title: 'Price: low to high'
  },
  {
    type: 'PriceLow',
    title: 'Price: high to low'
  },
  {
    type: 'Rated',
    title: 'Top rated first'
  },
];

export const REVIEW_FORM_STATUS = [
  {
    startNumber: 5,
    title: 'perfect'
  },
  {
    startNumber: 4,
    title: 'good'
  },
  {
    startNumber: 3,
    title: 'not bad'
  },
  {
    startNumber: 2,
    title: 'badly'
  },
  {
    startNumber: 1,
    title: 'terribly'
  },
];

export const DEFAULT_FILTER_TYPE = 'Paris';

export const DEFAULT_SORT_TYPE = {
  type: 'Popular',
  title: 'Popular'
};

export const PROPERTY_IMAGES_COUNT = 6;

export const REVIEWS_COUNT = 10;
