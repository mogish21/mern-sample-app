import { combineReducers } from "redux";
import authReducer from "./authReducer";
import companyReducer from "./reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use sessionStorage if you prefer

const persistConfig = {
  key: "auth", // key for the persisted part of state
  storage,
};

const companyPersistConfig = {
  key: "comapny", // key for the persisted part of state
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  company: persistReducer(companyPersistConfig, companyReducer),
});

export default rootReducer;
