import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price} = props.product;
    return (
        <div className="">
            <h5 className="">{name}</h5>
            <h6>Price: $ {price}</h6>
            <p>Quantity: {quantity}</p>
            <button className="btn btn-secondary" onClick= {()=>props.removeProduct(key)}>Remove Item</button>
            <hr/>
        </div>
    );
};

export default ReviewItem;