import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {loadOffers} from './action';
import {Offer} from '../types/offer';
import {APIRoute} from '../const';
import {setDataLoadedStatus, filterCity} from './action';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchOffers',
    async (_arg, {dispatch, extra: api}) => {
      dispatch(setDataLoadedStatus(true));
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(loadOffers(data));
      dispatch(setDataLoadedStatus(false));
      dispatch(filterCity());
    },
  );
