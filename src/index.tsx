import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

//ThemeProvider에서 가져온 색들 중 구체적인 색상을 정하고,
//ThemeProvider안에 둘러싸인 모든 component는 ThemeProvider에 접근할 수 있다.
