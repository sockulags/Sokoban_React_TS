import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App.tsx";
import {ScoreDataContextProvider} from "./context/ScoreDataContext.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ScoreDataContextProvider>
      <App />
    </ScoreDataContextProvider>
  </React.StrictMode>
);
