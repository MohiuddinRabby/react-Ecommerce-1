import React, { useState, useEffect } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { addToDatabaseCart, getDatabaseCart } from "../../utilities/databaseManager";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch('https://mighty-earth-81475.herokuapp.com/products')
      // node-mongo-2 local server - provides data from mongoDB
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
  }, [])
  useEffect(() => {
    //cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    if (products.length) {
      const cartProducts = productKeys.map(key => {
        const product = products.find(pd => pd.key === key);
        product.quantity = savedCart[key];
        return product;
      });
      setCart(cartProducts);
    }
  }, [products])
  const handleProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
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
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            key={product.key}
            showAddToCart={true}
            product={product}
            handleProduct={handleProduct}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}><Link to="/review"><button>Review Order</button></Link></Cart>
      </div>
    </div>
  );
};

export default Shop;
