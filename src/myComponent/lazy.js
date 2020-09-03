import React, { lazy } from 'react';

export const MyComponentLazy = lazy(() => import(/* webpackChunkName: "MyComponent" */'./index'))

