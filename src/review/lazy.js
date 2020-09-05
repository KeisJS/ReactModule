import React, { lazy } from 'react';

export const ReviewLazy = lazy(() => import(/* webpackChunkName: "Review" */'./module'));
