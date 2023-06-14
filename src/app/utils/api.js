import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { RootState } from './store';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com/',
    prepareHeaders: (headers) => {
      // Header customization logic can be implemented here
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['APP'],
});
