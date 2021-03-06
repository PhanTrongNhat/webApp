import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./features/products/index";
import Cart from "./features/cart/index";
import Me from "./features/me/index";
import { Provider } from "react-redux";
import store from "./redux/store";
//import "../src/css/css.css"
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Header></Header>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/me">
              <Me />
            </Route>
          </Switch>
          <Footer></Footer>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
