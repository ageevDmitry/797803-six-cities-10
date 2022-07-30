export type Location = {
    'latitude': number,
    'longitude': number,
    'zoom': number,
  };

export type City = {
  'city': {
    'location': Location,
    'name': string,
    }
  };
