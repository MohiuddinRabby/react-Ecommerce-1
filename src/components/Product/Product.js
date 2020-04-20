import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Product = (props) => {
  const { name, img, price, seller, key } = props.product;
  // console.log(props)
  return (
    <div className="product">
      <div className="product-img">{/* <img src={img} alt="" /> */}</div>
      <div>
        <h3 className="product-name">
          <Link to={"/product/" + key}>{name}</Link>
        </h3>
        <h5>By:{seller}</h5>
        <h3>Price : ${price}</h3>
       { props.showAddToCart===true &&  <button
         onClick={() => props.handleProduct(props.product)}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          Add to cart
        </button>}
      </div>
    </div>
  );
};

export default Product;
