import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/user-auth';

const Review = () => {
    const [cart, setCart] = useState([]);
    const auth = useAuth();
    //handle place order
    const handleRemoveITem = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://mighty-earth-81475.herokuapp.com/getProductsByKey', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(productKeys) // body data type must match "Content-Type" header
        })
            .then(res => res.json())
            .then(data => {
                const cartProducts = productKeys.map(key => {
                    const product = data.find(pd => pd.key === key);
                    product.quantity = savedCart[key];
                    return product;
                });
                setCart(cartProducts);
            })
    }, [])
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem
                        key={pd.key}
                        removeProduct={handleRemoveITem}
                        product={pd}></ReviewItem>)
                }
                {
                    !cart.length && <h2>You have no Item in Cart! <a href="/shop">Go to Shop</a></h2>
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/shipment">
                        {
                            auth.user ?
                                <button >Proceed checkout</button> :
                                <button>Process Login</button>
                        }
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;