import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Shuffle {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

interface Cards {
  success: boolean;
  deck_id: string;
  cards: {
    image: {
      code: string;
      image: string;
      images: { svg: string; png: string };
      value: string;
      suit: string;
    };
  }[];
  remaining: number;
}

// Define a service using a base URL and expected endpoints r339fn3cjv3b 4o2icvecv03r -jokers
export const deckOfCardsApi = createApi({
  reducerPath: 'deckOfCardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://deckofcardsapi.com/api/deck/r339fn3cjv3b/',
  }),
  tagTypes: ['cards', 'remaining'],
  endpoints: (builder) => ({
    shuffleCards: builder.query<Shuffle, void>({
      query: () => 'shuffle/?deck_count=1',
      providesTags: ['remaining'],
    }),
    reShuffleCards: builder.mutation<Shuffle, void>({
      query: () => 'shuffle/',
      invalidatesTags: ['remaining'],
    }),
    dealCards: builder.query<Cards, void>({
      query: () => 'draw/?count=5',
      providesTags: ['cards'],
    }),
    drawCards: builder.query<Cards, void>({
      query: () => 'draw/?count=5',
      providesTags: ['cards'],
    }),
    dealNextCards: builder.mutation<void, void>({
      query: () => ({
        url: `draw/?count=0`,
      }),
      invalidatesTags: ['cards'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useShuffleCardsQuery,
  useReShuffleCardsMutation,
  useDealCardsQuery,
  useDealNextCardsMutation,
  useDrawCardsQuery,
} = deckOfCardsApi;
