"use client";

import React from "react";
import { useCartStore } from "../../../store/cart-store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { checkoutAction } from "./chekout-action";

const CheckoutPage = () => {
  const { items, removeitem, addItem, clearCart } = useCartStore();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const formatPrice = (price: number) => `$${(price / 100).toFixed(2)}`;

  if (items.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-neutral-50 px-4 py-16">
        <Card className="w-full max-w-md rounded-2xl border-neutral-200 shadow-sm">
          <CardContent className="flex flex-col items-center px-6 py-12 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100">
              <ShoppingBag className="h-10 w-10 text-neutral-500" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              Your cart is empty
            </h1>

            <p className="mt-2 max-w-xs text-sm leading-6 text-neutral-500">
              Looks like you haven't added anything to your cart yet.
              Explore our products to find something you love.
            </p>

            <Button

              className="mt-6 h-11 rounded-xl px-6"
            >
              <a href="/products">Explore Products</a>
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-neutral-500">
            Home / Cart / Checkout
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-neutral-500 sm:text-base">
            Review your items before proceeding to payment.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <section className="lg:col-span-2">
            <Card className="overflow-hidden rounded-2xl border-neutral-200 shadow-sm">
              <CardHeader className="border-b border-neutral-100 px-5 py-5 sm:px-6">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-lg font-semibold">
                    Your Items
                  </CardTitle>

                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-600">
                    {items.reduce((sum, item) => sum + item.quantity, 0)} items
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <ul className="divide-y divide-neutral-100">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="p-5 transition-colors hover:bg-neutral-50/70 sm:p-6"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        {/* Product Information */}
                        <div className="min-w-0">
                          <h2 className="break-words text-base font-semibold text-neutral-900">
                            {item.name}
                          </h2>

                          <p className="mt-1 text-sm text-neutral-500">
                            {formatPrice(item.price)} per item
                          </p>

                          <p className="mt-2 text-sm font-medium text-neutral-700">
                            Subtotal: {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between gap-4 sm:justify-end">
                          <div>
                            <p className="mb-2 text-xs font-medium text-neutral-500">
                              Quantity
                            </p>

                            <div className="flex items-center rounded-xl border border-neutral-200 bg-white p-1">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-lg"
                                onClick={() => removeitem(item.id)}
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                {item.quantity === 1 ? (
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                ) : (
                                  <Minus className="h-4 w-4" />
                                )}
                              </Button>

                              <span
                                className="min-w-10 text-center text-sm font-semibold text-neutral-900"
                                aria-live="polite"
                              >
                                {item.quantity}
                              </span>

                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-lg"
                                onClick={() =>
                                  addItem({ ...item, quantity: 1 })
                                }
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="min-w-20 text-right">
                            <p className="text-xs text-neutral-500">
                              Item total
                            </p>
                            <p className="mt-1 font-semibold text-neutral-900">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* Clear Cart */}
                <div className="flex justify-end border-t border-gray-100 px-5 py-4 sm:px-6">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={clearCart}
                    className="rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Order Summary */}
          <aside className="lg:col-span-1">
            <Card className="rounded-2xl border-neutral-200 shadow-sm lg:sticky lg:top-6">
              <CardHeader className="border-b border-neutral-100 px-5 py-5">
                <CardTitle className="text-lg font-semibold">
                  Order Summary
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5 p-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500">
                    Subtotal
                  </span>
                  <span className="font-medium text-neutral-900">
                    {formatPrice(total)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500">
                    Shipping
                  </span>
                  <span className="font-medium text-green-600">
                    Calculated at checkout
                  </span>
                </div>

                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-base font-semibold text-neutral-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold tracking-tight text-neutral-900">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-neutral-500">
                    Final shipping charges and applicable taxes will be
                    confirmed during checkout.
                  </p>
                </div>

                <form action={checkoutAction}>
                  <input type="hidden" name="items" value={JSON.stringify(items)} />
                  <Button
                    type="submit"
                    className="h-12 w-full rounded-xl text-base font-semibold shadow-sm"
                  >
                    Proceed to Payment
                  </Button>
                </form>

                <p className="text-center text-xs leading-5 text-neutral-500">
                  <span className="font-medium text-neutral-700">
                    Secure checkout
                  </span>
                  {" "}· Your order will be processed securely.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;