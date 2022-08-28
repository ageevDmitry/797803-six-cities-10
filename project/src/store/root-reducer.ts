import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {userProcess} from './user-process/user-process';
import {offersData} from './offers-data/offers-data';
import {offersUI} from './offers-ui/offers-ui';
import { dataError } from './data-error/data-error';

export const rootReducer = combineReducers({
  [NameSpace.UserProcess]: userProcess.reducer,
  [NameSpace.OffersData]: offersData.reducer,
  [NameSpace.OffersUI]: offersUI.reducer,
  [NameSpace.DataError]: dataError.reducer,
});
