import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Product = (props) => {
  const { name, img, price, seller, key } = props.product;
  // console.log(props)
  return (
    <div className="container-fluid">
      <div className="img-fluid"><img src={img} alt="" /></div>
      <div>
        <h5 className="product-name">
          <Link to={"/product/" + key}>{name}</Link>
        </h5>
        <h6>By:{seller}</h6>
        <h6>Price : ${price}</h6>
       { props.showAddToCart===true &&  <button className="btn btn-secondary"
         onClick={() => props.handleProduct(props.product)}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          Add to Cart
        </button>}
      </div>
      <hr/>
    </div>
  );
};

export default Product;
