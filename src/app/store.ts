import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { deckOfCardsApi } from '../api/apiSlice';
import dealDrawReducer from '../features/dealDrawSlice';
import holdCardOneReducer from '../features/holdOneSlice';
import rotateReducer from '../features/rotateSlice';

export const store = configureStore({
  reducer: {
    dealDraw: dealDrawReducer,
    holdCardOne: holdCardOneReducer,
    rotate: rotateReducer,
    // Add the generated reducer as a specific top-level slice
    [deckOfCardsApi.reducerPath]: deckOfCardsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(deckOfCardsApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
