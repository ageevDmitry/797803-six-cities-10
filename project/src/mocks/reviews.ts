import {Review} from '../types/review';

export const reviews: Review[] = [
  {
    'comment': 'Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?',
    'date': 'Sat Feb 26 2022 09:33:37 GMT+0300 (Москва, стандартное время)',
    'id': 1,
    'rating': 4,
    'user': {
      'avatarUrl': 'img/avatar-max.jpg',
      'id': 1,
      'isPro': false,
      'name': 'Oleg',
    },
  },
  {
    'comment': 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'date': 'Sat June 24 2022 09:33:37 GMT+0300 (Москва, стандартное время)',
    'id': 2,
    'rating': 2.5,
    'user': {
      'avatarUrl': 'img/avatar-angelina.jpg',
      'id': 2,
      'isPro': true,
      'name': 'Olga',
    },
  },
];
