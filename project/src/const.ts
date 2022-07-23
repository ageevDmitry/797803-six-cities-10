export enum AppRoute {
    Main = '/',
    Login = '/login',
    Favorites = '/favorites',
    Property = '/offer/:id'
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

export const MAP_CITY = {
  Amsterdam: {
    'location': {
      'latitude': 52.370216,
      'longitude': 4.895168,
      'zoom': 10,
    },
    'name': 'Amsterdam',
  },
};

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

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const OFFERS_COUNT = 312;

export const PLACE_CARDS_COUNT = 4;

export const START_PLACE_CARD_ID = 0;

