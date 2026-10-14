
"use client";
import Image from "next/image";

import type Stripe from "stripe";
import { Minus, Plus, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "../../store/cart-store";

interface Props {
    product: Stripe.Product;
}

const ProductDetail = ({ product }: Props) => {
    //   const [quantity, setQuantity] = useState(1);
    const { items, addItem, removeitem } = useCartStore()

    const cartItem = items.find((item) => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;


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

    const formattedPrice =
        unitAmount !== null
            ? new Intl.NumberFormat("en-US", {
                style: "currency",
                currency,
            }).format(unitAmount / 100)
            : null;

    const onAddItem = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: price?.unit_amount as number,
            imageUrl: product.images ? product.images[0] : null,
            quantity: 1,
        })
    }

    //   const totalPrice =
    //     unitAmount !== null
    //       ? new Intl.NumberFormat("en-US", {
    //           style: "currency",
    //           currency,
    //         }).format((unitAmount * quantity) / 100)
    //       : null;

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
                {/* Product Image */}
                <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-10">
                    {product.images?.[0] ? (
                        <Image
                            src={product.images[0]}
                            alt={product.name || "Product image"}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain p-6 transition-transform duration-500 hover:scale-105 sm:p-10"
                        />
                    ) : (
                        <ShoppingBag
                            className="h-24 w-24 text-neutral-300"
                            aria-hidden="true"
                        />
                    )}

                    <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-700 shadow-sm">
                        Product Details
                    </span>
                </div>

                {/* Product Information */}
                <div className="flex flex-col justify-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
                        Discover our collection
                    </p>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                        {product.name}
                    </h1>

                    <p className="mt-5 text-base leading-7 text-neutral-600">
                        {product.description ||
                            "Discover quality and style with this product from our collection."}
                    </p>

                    {/* Price */}
                    <div className="mt-8 border-y border-neutral-200 py-6">
                        <p className="text-sm font-medium text-neutral-500">
                            Price per item
                        </p>

                        <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-900">
                            {formattedPrice || (
                                <span className="text-lg font-medium text-neutral-400">
                                    Price unavailable
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="mt-7">
                        <p className="mb-3 text-sm font-semibold text-neutral-900">
                            Quantity
                        </p>

                        <div className="flex w-fit items-center rounded-xl border border-neutral-200 bg-white p-1">
                            <Button
                               onClick={() => removeitem(product.id)}
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-lg"
                                // disabled={quantity <= 1}
                                // onClick={() =>
                                //   setQuantity((prev) => Math.max(1, prev - 1))
                                // }
                                aria-label="Decrease quantity"
                            >
                                <Minus className="h-4 w-4" />
                            </Button>

                            <span
                                className="min-w-12 text-center text-base font-semibold text-neutral-900"
                                aria-live="polite"
                            >
                                {/* {quantity} */}
                            </span>
                            <span>{quantity}</span>
                            <Button
                            onClick={onAddItem}
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-lg"
                                // disabled={quantity >= 99}
                                // onClick={() =>
                                //   setQuantity((prev) => Math.min(99, prev + 1))
                                // }
                                aria-label="Increase quantity"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>

                    </div>

                    {/* Total Price */}
                    {/* {totalPrice && (
            <div className="mt-6 flex items-center justify-between rounded-xl bg-neutral-50 px-4 py-4">
              <span className="text-sm font-medium text-neutral-600">
                Total price
              </span>

              <span className="text-xl font-bold text-neutral-900">
                {totalPrice}
              </span>
            </div>
          )} */}

                    {/* Purchase Button */}
                    <Button
                        type="button"
                        size="lg"
                        disabled={unitAmount === null || unitAmount <= 0}
                        className="mt-6 h-12 w-full rounded-xl bg-neutral-900 text-base font-semibold text-white transition-colors hover:bg-neutral-700"
                    >
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Add to Cart
                    </Button>

                    <p className="mt-4 text-center text-xs leading-5 text-neutral-500">
                        Secure checkout · Quality products · Simple shopping
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
