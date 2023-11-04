import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/boxicons-2.0.7/css/boxicons.css";
import Layout from "./components/Layout";
import "./sass/index.scss";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";


ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Provider store={store}>
            <Layout />
        </Provider>
    </BrowserRouter>
);
