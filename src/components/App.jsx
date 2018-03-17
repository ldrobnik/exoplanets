import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import Home from "./Home";
import DetailedView from "./DetailedView";


class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={Home}/>
                    <Route path="/details/:id" component={DetailedView}/>
                </div>
            </Router>
        );
    }

}

export default App;