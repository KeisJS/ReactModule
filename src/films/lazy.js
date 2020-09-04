import React, { lazy } from 'react';

export const FilmsLazy = lazy(() => import(/* webpackChunkName: "Films" */'./index'));
