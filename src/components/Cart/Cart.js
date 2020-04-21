import React from "react";

const Cart = (props) => {
  const carts = props.cart;

  //process1 to calculate total price
  const total = carts.reduce(
    (totalPrice, product) => totalPrice + product.price * product.quantity,0
  );
  //reduce(param1,param2) takes array elements and provides a single element

  /*
  //process2 to calculate total price
  let total = 0;
  for(let i = 0;i<carts.length;i++){
      const product = carts[i];
      total = total + product.price;
  }
  */
  let shippingCost = 0;
  if (total > 35) {
    shippingCost = 0;
  } else if (total > 15) {
    shippingCost = 4.99;
  } else if (total > 0) {
    shippingCost = 15;
  }
  const tax = total / 10;
  const grandToal = total+shippingCost+tax;
  const formatNumber = (num)=>{
      //to format number to fixed value
const precision = num.toFixed(2)
return Number(precision);
  }
  return (
    <div>
      <h4>Order Summary: {carts.length}</h4>
      <h4>shippingCost: ${shippingCost}</h4>
      <h3>Total Price: ${formatNumber(grandToal)}</h3>
      <p><small>*Tax:{formatNumber(tax)}</small></p>
      {
        props.children
      }
    </div>
  );
};

export default Cart;
