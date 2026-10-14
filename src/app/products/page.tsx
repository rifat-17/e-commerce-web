import ProductList from '@/components/ProductList';
import { stripe } from '@/lib/stripe';
import React from 'react';

const ProductsPage = async () => {

    const { data: products } = await stripe.products.list({
        expand: ["data.default_price"],
        limit: 9,
      });   

    return (
        <div>
           
           <ProductList products={products} />
        </div>
    );
};

export default ProductsPage;