import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/authSlice";
import cookieReducer from "./features/cookieSlice";
import collectionReducer from "./features/collectionSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cookie: cookieReducer,
  collection: collectionReducer
});

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
