import React, { useState } from "react";
import fakeData from "../../fakeData";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
const Shop = () => {
  const firstTen = fakeData.slice(0, 10);
  const [products, setProducts] = useState(firstTen);
  const [cart, setCart] = useState([]);
  const handleProduct = (product) => {
    // console.log("clicked", product);
    const newCart = [...cart,product];
    /*
    here product is from handleProduct param
    */
    setCart(newCart);
  };
  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product showAddToCart={true} product={product} handleProduct={handleProduct}></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart = {cart}>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
