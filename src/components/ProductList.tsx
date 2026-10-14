
"use client";

import { useState } from "react";
import type Stripe from "stripe";

import ProductCard from "./ProductCard";

interface Props {
  products: Stripe.Product[];
}

const ProductList = ({ products }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLocaleLowerCase();
    const nameMatch =  product.name.toLowerCase().includes(term);
    const descriptionMatch = product.description? product.description.toLocaleLowerCase().includes(term)
    : false;
    
    return nameMatch || descriptionMatch;
  });

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-neutral-500">
            Explore our collection
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            All Products
          </h2>

          <p className="mt-2 text-sm leading-6 text-neutral-500 sm:text-base">
            Discover products you'll love.
          </p>
        </div>

        <p className="text-sm font-medium text-neutral-500">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"} found
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative w-full max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>

          <input
            type="searchTerm"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-3.5 pl-12 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-900 focus:bg-white focus:ring-4 focus:ring-neutral-100"
          />
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <li key={product.id} className="min-w-0">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-16 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl shadow-sm">
            🛍️
          </div>

          <h3 className="text-xl font-semibold text-neutral-900">
            No products found
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
            {products.length === 0
              ? "There are no products available right now. Please check back later."
              : "We couldn't find any products matching your search. Try a different name."}
          </p>

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="mt-6 rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 focus:outline-none focus:ring-4 focus:ring-neutral-200"
            >
              Clear Search
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default ProductList;
