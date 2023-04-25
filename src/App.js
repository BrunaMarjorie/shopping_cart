import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import "./config/ReactotronConfig";

import GlobalStyle from "./styles/global";
import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "./store/index";


function App() {
  return (
      <Provider store={store}>
         <BrowserRouter>
          <Header />
          <AppRoutes />
          <GlobalStyle />
        </BrowserRouter>
      </Provider>
  );
}

export default App;
