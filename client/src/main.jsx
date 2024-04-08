import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import route from "./router";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import {store} from './redux/store.js'
import './Firebase/config.jsx'

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={route} />
      <ReactQueryDevtools initialIsOpen={false} />
    </Provider>
  </QueryClientProvider>
  // </React.StrictMode>,
);
