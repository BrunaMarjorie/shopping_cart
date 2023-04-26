import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import "./config/ReactotronConfig";
import { ToastContainer } from "react-toastify";

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
          <ToastContainer autoClose={1000} position="bottom-right"/>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
