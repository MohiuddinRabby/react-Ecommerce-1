import React, { useState } from "react";
import fakeData from "../../fakeData";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { addToDatabaseCart } from "../../utilities/databaseManager";
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
    const sameProduct = newCart.filter(pd=>pd.key===product.key);
    const count = sameProduct.length;
    addToDatabaseCart(product.key,count);
  };
  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
          key = {product.key}
           showAddToCart={true} product={product} 
           handleProduct={handleProduct}>
           </Product>
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
