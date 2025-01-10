import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AppProvider from "./context/AppProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AppProvider>
    </Router>
  </StrictMode>
);
