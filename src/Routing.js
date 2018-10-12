import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper/Wrapper";

const Routing = () => (
    <Router>
        <Route exact path="/" component={Wrapper}/>

    </Router>
);

export default Routing;