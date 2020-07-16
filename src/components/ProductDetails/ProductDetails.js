import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useState } from 'react';

const ProductDetails = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState(null)
    useEffect(() => {
        fetch('https://mighty-earth-81475.herokuapp.com/product/' + productKey)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
            })

    }, [])
    return (
        <div>
            <h1>Product details</h1>
            {product && <Product showAddToCart={false} product={product}></Product>}
        </div>
    );
};

export default ProductDetails;