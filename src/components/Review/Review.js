import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/user-auth';

const Review = () => {
    const [cart,setCart ]= useState([]);
    const auth = useAuth();
    //handle place order
    const handlePlaceOrder = () =>{
        setCart([]);
        processOrder();
    }
    const handleRemoveITem = (productKey)=>{
        const newCart = cart.filter(pd=>pd.key!==productKey);
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
       <div className="shop-container">
            <div className="product-container">
            {
                cart.map(pd=> <ReviewItem
                    key = {pd.key}
                    removeProduct = {handleRemoveITem}
                    product={pd}></ReviewItem>)
            }
            {
                !cart.length&& <h2>You have no Item in Cart! <a href="/shop">Go to Shop</a></h2>
            }
        </div>
        <div className="cart-container">
            <Cart cart={cart}>
                <Link to="/shipment">
                    {
                        auth.user?
                        <button >Proceed checkout</button>:
                        <button>Process Login</button>
                    }
                    </Link>
            </Cart>
        </div>
       </div>
    );
};

export default Review;