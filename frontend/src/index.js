import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { I18nProvider } from "./i18n"; // Import the I18nProvider

const container = document.getElementById("root");
const root = createRoot(container); // create a root

root.render(
  <Provider store={store}>
    <I18nProvider>
      <App />
    </I18nProvider>
  </Provider>
);
