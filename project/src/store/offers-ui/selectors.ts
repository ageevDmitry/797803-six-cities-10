import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {SortType} from '../../types/sort-type';
import {City} from '../../types/city';

export const getFilterType = (state: State): string => state[NameSpace.OffersUI].filterType;
export const getSortType = (state: State): SortType => state[NameSpace.OffersUI].sortType;
export const getMapCity = (state: State): City | undefined => state[NameSpace.OffersUI].mapCity;
