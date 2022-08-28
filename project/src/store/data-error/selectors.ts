import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getIsDataError = (state: State): boolean => state[NameSpace.DataError].isDataError;
