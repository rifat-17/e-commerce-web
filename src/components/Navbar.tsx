import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className='sticky top-0 z-50 bg-white shadow'>
            <div className='container mx-auto flex items-center justify-between px-4 py-4'>
                <Link href="/">
                    My Ecommerce
                </Link>
            </div>
            
            <div className='hidden md:flex space-x-6'>
                 <Link href="/">Home</Link>
                 <Link href="/products" >Products</Link>
                 <Link href="/checkout" >Checkout</Link>
            </div>
            <div className='flex items-center space-x-4'>
                {/* work later remind me */}
            </div>
        </nav>
    );
};

export default Navbar;