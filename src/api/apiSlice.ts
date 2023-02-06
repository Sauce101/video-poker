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
    code: string;
    image: string;
    images: { svg: string; png: string };
    value: string;
    suit: string;
  }[];
  remaining: number;
}

// Define a service using a base URL and expected endpoints  4o2icvecv03r -jokers wn9ob613ltvc
export const deckOfCardsApi = createApi({
  reducerPath: 'deckOfCardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://deckofcardsapi.com/api/deck/wn9ob613ltvc/',
  }),
  tagTypes: ['Deal', 'Draw', 'Shuffle'],
  endpoints: (builder) => ({
    shuffleCards: builder.query<Shuffle, void>({
      query: () => 'shuffle/?deck_count=1',
      providesTags: ['Shuffle'],
    }),
    reShuffleCards: builder.mutation<Shuffle, void>({
      query: () => 'shuffle/',
      invalidatesTags: ['Shuffle'],
    }),
    dealCards: builder.query<Cards, void>({
      query: () => 'draw/?count=5',
      providesTags: ['Deal'],
    }),
    drawCards: builder.query<Cards, void>({
      query: () => 'draw/?count=5',
      providesTags: ['Draw'],
    }),
    dealNextCards: builder.mutation<void, void>({
      query: () => ({
        url: `draw/?count=0`,
      }),
      invalidatesTags: ['Deal', 'Draw'],
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
