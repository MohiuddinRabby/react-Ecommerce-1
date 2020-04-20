import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart,setCart ]= useState([]);
    const handleRemoveITem = (productKey)=>{
        console.log('remove click',productKey);
        const newCart = cart.filter(pd=>pd.key!=productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts =  productKeys.map(key=>{
            const product = fakeData.find(pd=>pd.key===key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    },[])
    return (
        <div>
            <h1>order quantity: {cart.length}</h1>
            {
                cart.map(pd=> <ReviewItem
                    key = {pd.key}
                    removeProduct = {handleRemoveITem}
                    product={pd}></ReviewItem>)
            }
        </div>
    );
};

export default Review;