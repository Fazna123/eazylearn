import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.ts";
import courseReducer from "./courses/courseSlice.ts";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const createResetStateMiddleware = () => {
  let timeout: NodeJS.Timeout;

  return (storeAPI: any) => (next: any) => (action: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      storeAPI.dispatch({ type: "RESET_STATE" }); // Dispatch an action to reset the state
    }, 3600000); // 1 hour inactivity timeout

    return next(action);
  };
};

const rootReducer = combineReducers({
  user: userReducer,
  course: courseReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(createResetStateMiddleware()),
});

export const persistor = persistStore(store);
