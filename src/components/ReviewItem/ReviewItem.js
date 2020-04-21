import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price} = props.product;
    return (
        <div className="product-review">
            <h3 className="product-name">{name}</h3>
            <h4>Price: $ {price}</h4>
            <p>Quantity: {quantity}</p>
            <button onClick= {()=>props.removeProduct(key)}>Remove Item</button>
        </div>
    );
};

export default ReviewItem;