import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key} = props.product;
    return (
        <div className="product-review">
            <h3 className="product-name">{name}</h3>
            <p>Quantity: {quantity}</p>
            <button onClick= {()=>props.removeProduct(key)}>Remove Item</button>
        </div>
    );
};

export default ReviewItem;