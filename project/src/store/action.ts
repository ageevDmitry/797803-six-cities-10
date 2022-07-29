import {createAction} from '@reduxjs/toolkit';

export const chooseCity = createAction<{town: string}>('main/chooseCity');
