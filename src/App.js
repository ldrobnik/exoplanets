import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import Home from "./containers/Home/Home";
import DetailedView from "./containers/Detailed View/DetailedView";


class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={Home}/>
                    <Route path="/details/:hostName/:planetLetter" component={DetailedView}/>
                </div>
            </Router>
        );
    }

}

export default App;