import ReactDOM from "react-dom/client"; // Ensure this import path is correct
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import App from "./App";

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById("root")!); // Type assertion to avoid null error
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
