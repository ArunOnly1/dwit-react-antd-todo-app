import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { TodoProvider } from "./contexts/TodoContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </StrictMode>,
  rootElement
);
