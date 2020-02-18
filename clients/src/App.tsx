import React from "react";
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Emailverify from "./components/Verify";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/verifyEmail">
            <Emailverify />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
