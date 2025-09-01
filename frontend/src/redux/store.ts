import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // LocalStorage by default
import rootReducer from "./rootReducer"; // Root reducer for your app

// Persist config
const persistConfig = {
  key: "root", // key to store in local storage
  storage, // storage to use, defaults to localStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };
