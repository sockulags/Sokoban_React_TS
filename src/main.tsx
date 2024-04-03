import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App.tsx";
import {ScoreDataContextProvider} from "./context/ScoreDataContext.tsx"
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <ScoreDataContextProvider>
        <App />
      </ScoreDataContextProvider>
    </Router>
  </React.StrictMode>
);
