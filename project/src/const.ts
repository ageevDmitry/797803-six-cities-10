export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Property = '/offer/:id'
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
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

export const PLACE_CARD_CLASS_NAME = {
  [PlaceCardType.Cities]: 'cities__places-list places__list tabs__content',
  [PlaceCardType.Favorites]: 'favorites__places',
  [PlaceCardType.NearPlaces]: 'near-places__list places__list',
};

export enum RatingWidthFactor {
  Film = 14.8,
  Review = 19.5
}

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

export const URL_MARKER_DEFAULT = 'img/pin.svg';

export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export const DEFAULT_FILTER_TYPE = 'Paris';

export const DEFAULT_SORT_TYPE = {
  type: 'Popular',
  title: 'Popular'
};
