import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Shuffle {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

interface ReturnCards {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
  piles: {
    discard: {
      remaining: number;
    };
  };
}

interface Cards {
  success: boolean;
  deck_id: string;
  cards: {
    code: string;
    image: string;
    images: { svg: string; png: string };
    value: string;
    suit: string;
  }[];
  remaining: number;
}

// Define a service using a base URL and expected endpoints
export const deckOfCardsApi = createApi({
  reducerPath: 'deckOfCardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://deckofcardsapi.com/api/deck/new/',
  }),
  tagTypes: ['Shuffle', 'Deal'],
  endpoints: (builder) => ({
    shuffleCards: builder.query<Shuffle, void>({
      query: () => 'shuffle/',
      providesTags: ['Shuffle'],
    }),
    returnCards: builder.mutation<ReturnCards, void>({
      query: () => 'return/',
      invalidatesTags: ['Shuffle'],
    }),
    reShuffleCards: builder.mutation<Shuffle, void>({
      query: () => 'shuffle/',
      invalidatesTags: ['Shuffle'],
    }),
    dealCards: builder.query<Cards, void>({
      query: () => 'draw/?count=10',
      providesTags: ['Deal'],
    }),
    dealNextCards: builder.mutation<Cards, void>({
      query: () => ({
        url: `draw/`,
      }),
      invalidatesTags: ['Deal'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useShuffleCardsQuery,
  useReturnCardsMutation,
  useReShuffleCardsMutation,
  useDealCardsQuery,
  useDealNextCardsMutation,
} = deckOfCardsApi;
