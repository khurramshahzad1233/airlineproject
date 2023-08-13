import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import Flightprovider from "./context/Flightprovider";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from "./config/fbConfig";
import { isLoaded } from "react-redux-firebase";
import { Spinner } from "react-bootstrap";
import "react-phone-number-input/style.css";

import App from "./App";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
  attachAuthIsReady: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return;
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    }}
  >
    <Spinner
      animation="border"
      variant="primary"
      style={{ height: "4rem", width: "4rem" }}
    />
  </div>;
  return children;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Flightprovider>
        <AuthIsLoaded>
          <App />
        </AuthIsLoaded>
      </Flightprovider>
    </ReactReduxFirebaseProvider>
  </Provider>
);
