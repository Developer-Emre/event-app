import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './authSlice'
import eventReducer from './eventSlice'
import checkoutReducer from './checkoutSlice'
import orderReducer from './orderSlice'

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'isAuthenticated'],
}

const orderPersistConfig = {
  key: 'orders',
  storage,
  whitelist: ['orders'],
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  orders: persistReducer(orderPersistConfig, orderReducer),
  events: eventReducer,
  checkout: checkoutReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
