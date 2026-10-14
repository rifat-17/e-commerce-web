import ProductDetail from '@/components/ProductDetail';
import { stripe } from '@/lib/stripe';
import React from 'react';

interface Props {
    params: Promise<{ id: string }>;
}

const ProductDetailPage = async ({ params }: Props) => {
    const { id } = await params;
    const product = await stripe.products.retrieve(id, {
        expand: ["default_price"],
    });

    const plainProduct = JSON.parse(JSON.stringify(product));

    return (
        <div>
            <ProductDetail product={plainProduct} />
        </div>
    );
};

export default ProductDetailPage;