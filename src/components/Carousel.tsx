
"use client";

import { useEffect, useState } from "react";
import type Stripe from "stripe";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";

import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  products: Stripe.Product[];
}

export default function Carousel({ products }: Props) {
  const [current, setCurrent] = useState(0);

  // Automatically move to the next product
  useEffect(() => {
    if (products.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  // Handle an empty product list
  if (products.length === 0) {
    return (
      <Card className="flex min-h-80 items-center justify-center rounded-2xl border-dashed p-8">
        <div className="text-center">
          <ShoppingBag className="mx-auto mb-4 h-10 w-10 text-neutral-400" />

          <h3 className="text-lg font-semibold text-neutral-800">
            No products available
          </h3>

          <p className="mt-2 text-sm text-neutral-500">
            Check back later for our latest products.
          </p>
        </div>
      </Card>
    );
  }

  const currentProduct = products[current] ?? products[0];

  const price =
    typeof currentProduct.default_price === "object" &&
    currentProduct.default_price !== null
      ? currentProduct.default_price
      : null;

  const unitAmount =
    price && !("deleted" in price) ? price.unit_amount : null;

  const currency =
    price && !("deleted" in price)
      ? price.currency.toUpperCase()
      : "USD";

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % products.length);
  };

  return (
    <Card className="group mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border-neutral-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Product Image */}
        <div className="relative flex min-h-72 items-center justify-center overflow-hidden bg-neutral-100 p-8 sm:min-h-96 md:min-h-[420px]">
          {currentProduct.images?.[0] ? (
            <Image
              key={currentProduct.images[0]}
              src={currentProduct.images[0]}
              alt={currentProduct.name || "Featured product"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <ShoppingBag
              className="h-20 w-20 text-neutral-300"
              aria-hidden="true"
            />
          )}

          {/* Featured Badge */}
          <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-800 shadow-sm">
            Featured Product
          </span>

          {/* Image Navigation */}
          {products.length > 1 && (
            <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="rounded-full bg-white/90 shadow-md hover:bg-white"
                onClick={goToPrevious}
                aria-label="Previous product"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="rounded-full bg-white/90 shadow-md hover:bg-white"
                onClick={goToNext}
                aria-label="Next product"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Product Details */}
        <CardContent className="flex flex-col justify-center p-6 sm:p-10 md:p-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-500">
            Our Collection
          </p>

          <CardTitle className="text-2xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
            {currentProduct.name}
          </CardTitle>

          <p className="mt-4 line-clamp-3 text-sm leading-7 text-neutral-600 sm:text-base">
            {currentProduct.description ||
              "Discover quality and style with this product from our collection."}
          </p>

          {/* Price */}
          <div className="mt-6 border-t border-neutral-200 pt-6">
            <p className="text-sm text-neutral-500">Price</p>

            <p className="mt-1 text-3xl font-bold tracking-tight text-neutral-900">
              {unitAmount !== null ? (
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency,
                }).format(unitAmount / 100)
              ) : (
                <span className="text-lg text-neutral-500">
                  Price unavailable
                </span>
              )}
            </p>
          </div>

          {/* Slide Indicators */}
          {products.length > 1 && (
            <div
              className="mt-8 flex items-center gap-2"
              aria-label={`Product ${current + 1} of ${products.length}`}
            >
              {products.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-label={`Show product ${index + 1}`}
                  aria-current={current === index ? "true" : undefined}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === index
                      ? "w-8 bg-neutral-900"
                      : "w-2 bg-neutral-300 hover:bg-neutral-500"
                  }`}
                />
              ))}

              <span className="ml-auto text-xs text-neutral-500">
                {current + 1} / {products.length}
              </span>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
