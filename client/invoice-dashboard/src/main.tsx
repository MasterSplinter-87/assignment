import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { store } from "./store/store";
import "./index.css";
import { SearchProvider } from "./context/SearchProvider";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </QueryClientProvider>
  </Provider>
);
