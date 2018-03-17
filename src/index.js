import React from "react";
import ReactDom from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducer from "./reducers";
import App from "./components/App"; //main app component
import "./css/main.css"; //main stylesheet

const store = createStore(reducer);

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);