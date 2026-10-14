
import Image from "next/image";
import Link from "next/link";
import type Stripe from "stripe";

import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  product: Stripe.Product;
}

const ProductCard = ({ product }: Props) => {
  const price =
    typeof product.default_price === "object" &&
    product.default_price !== null
      ? product.default_price
      : null;

  const unitAmount =
    price && !("deleted" in price) ? price.unit_amount : null;

  const currency =
    price && !("deleted" in price)
      ? price.currency.toUpperCase()
      : "USD";

  const productHref = `/products/${product.id}`;

  return (
    <Card className="group h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl">
      {/* Product Image */}
      <Link
        href={productHref}
        className="relative block aspect-square overflow-hidden bg-neutral-100"
      >
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name || "Product image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">
            🛍️
          </div>
        )}

        {/* Product Badge */}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm backdrop-blur">
          Featured
        </span>
      </Link>

      {/* Product Information */}
      <CardContent className="flex flex-col p-5">
        <Link href={productHref} className="block">
          <CardTitle className="line-clamp-2 min-h-12 text-base font-semibold leading-6 text-neutral-900 transition-colors group-hover:text-neutral-600 sm:text-lg">
            {product.name}
          </CardTitle>
        </Link>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-neutral-500">
          {product.description || "Discover more about this product."}
        </p>

        {/* Price */}
        <div className="mt-5 border-t border-neutral-100 pt-4">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-neutral-500">
            Price
          </p>

          <p className="text-2xl font-bold tracking-tight text-neutral-900">
            {unitAmount !== null ? (
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency,
              }).format(unitAmount / 100)
            ) : (
              <span className="text-base font-medium text-neutral-400">
                Price unavailable
              </span>
            )}
          </p>
        </div>

        {/* Details Button */}
        <Button
          
          className="mt-5 w-full rounded-xl bg-neutral-900 text-white transition-colors hover:bg-neutral-700"
        >
          <Link href={productHref}>View Details →</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
