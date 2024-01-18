"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div style={{ backgroundColor: "#ffffff" }}>{children}</div>
          <ToastContainer />
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
