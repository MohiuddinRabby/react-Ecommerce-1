import React, { useState, useEffect } from "react";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import loader from "../../images/loader.gif";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("https://mighty-earth-81475.herokuapp.com/products")
      // node-mongo-2 local server - provides data from mongoDB
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    //cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    if (products.length) {
      const cartProducts = productKeys.map((key) => {
        const product = products.find((pd) => pd.key === key);
        product.quantity = savedCart[key];
        return product;
      });
      setCart(cartProducts);
    }
  }, [products]);
  const handleProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    // console.log("clicked", product);
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          {isLoading ? (
            <div>
              <h1>Products loading...</h1>
              <img src={loader} style={{width:'500px'}} alt="loaderImg" />
            </div>
          ) : (
            products.map((product) => (
              <Product
                key={product.key}
                showAddToCart={true}
                product={product}
                handleProduct={handleProduct}
              ></Product>
            ))
          )}
        </div>
        <div className="col-md-3">
          <Cart cart={cart}>
            <Link to="/review">
              <button className="btn btn-secondary">Review Order</button>
            </Link>
          </Cart>
        </div>
      </div>
    </div>
  );
};

export default Shop;
