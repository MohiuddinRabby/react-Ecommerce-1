import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const ProductDetails = fakeData.find(product=>product.key===productKey);
    return (
        <div>
            <h1>{productKey} this is product details</h1>
            <Product showAddToCart={false} product={ProductDetails}></Product>
        </div>
    );
};

export default ProductDetails;