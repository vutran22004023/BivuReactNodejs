import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import route from "./router";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import {persistor, store} from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
// import './Firebase/config.jsx'

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={route} />
      <ReactQueryDevtools initialIsOpen={false} />
      </PersistGate>  
    </Provider>
  </QueryClientProvider>
  // </React.StrictMode>,
);
