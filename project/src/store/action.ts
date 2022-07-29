import {createAction} from '@reduxjs/toolkit';

export const changeCity = createAction<{city: string}>('main/changeCity');

export const filterCity = createAction('main/filterCity');
