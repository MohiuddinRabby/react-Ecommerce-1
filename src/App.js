import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import Notfound from "./components/Notfound/Notfound";
import Product from "./components/Product/Product";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProductDetails from "./components/ProductDetails/ProductDetails";
function App() {
  return (
   <div>
     <Header></Header>
     <Router>
       <Switch>
       <Route exact path="/">
           <Shop></Shop>
         </Route>
         <Route path="/shop">
           <Shop></Shop>
         </Route>
         <Route path="/review">
         <Review></Review>
         </Route>
         <Route path="/inventory">
           <Inventory></Inventory>
         </Route>
         <Route path="/product/:productKey">
           <ProductDetails></ProductDetails>
         </Route>
         <Route>
          <Notfound></Notfound>
         </Route>
       </Switch>
     </Router>
   </div>
  );
}
export default App;
