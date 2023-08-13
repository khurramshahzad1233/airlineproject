import { configureStore } from "@reduxjs/toolkit";
import { firestoreReducer, reduxFirestore } from "redux-firestore";
import { firebaseReducer, reactReduxFirebase } from "react-redux-firebase";
import fbConfig from "./config/fbConfig";

export const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
    firestore: firestoreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  enhancers: [reduxFirestore(fbConfig)],
});
