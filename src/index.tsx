import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeIcons } from "@uifabric/icons";
import { ServiceProvider, ServiceProviderContext } from "./ServiceProvider";
import { CdsService } from "./CdsService";
import { CurrencyViewModel } from "./viewmodels/CurrencyViewModel";
initializeIcons();

const serviceProvider = new ServiceProvider();

const cdsService = new CdsService();
serviceProvider.register("CdsService", cdsService);

const currencyViewModel = new CurrencyViewModel(serviceProvider);
serviceProvider.register("Currencies", currencyViewModel);

ReactDOM.render(
  <ServiceProviderContext.Provider value={serviceProvider}>
    <App />
  </ServiceProviderContext.Provider>,
  document.getElementById("root"),
);

currencyViewModel.init();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
