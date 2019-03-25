import React, {Component, Suspense} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import Home from "./containers/Home/Home";
// import DetailedView from "./containers/Detailed View/DetailedView";


const DetailedView = React.lazy(() => {
    return import("./containers/Detailed View/DetailedView");
});

class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={Home}/>
                    <Suspense fallback="..."><Route path="/details/:hostName/:planetLetter" component={DetailedView}/></Suspense>
                </div>
            </Router>
        );
    }

}

export default App;