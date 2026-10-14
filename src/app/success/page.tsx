"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Check, CheckCircle2, ShoppingBag } from "lucide-react";

import { useCartStore } from "../../../store/cart-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const PaymentSuccessPage = () => {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12">
      <Card className="w-full max-w-lg overflow-hidden rounded-3xl border-neutral-200 bg-white shadow-sm">
        {/* Success Banner */}
        <div className="h-2 w-full bg-green-500" />

        <CardContent className="flex flex-col items-center px-6 py-12 text-center sm:px-10 sm:py-14">
          {/* Success Icon */}
          <div className="relative mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-green-50">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2
                className="h-10 w-10 text-green-600"
                strokeWidth={1.8}
              />
            </div>

            <span className="absolute right-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-green-500 text-white">
              <Check className="h-4 w-4" strokeWidth={3} />
            </span>
          </div>

          {/* Confirmation Message */}
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
            Payment Confirmed
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Payment Successful!
          </h1>

          <p className="mt-4 max-w-sm text-sm leading-7 text-neutral-500 sm:text-base">
            Thank you for your purchase! Your payment has been completed
            successfully. We appreciate your trust in us.
          </p>

          {/* Confirmation Details */}
          <div className="mt-8 w-full rounded-2xl border border-green-100 bg-green-50/70 p-5 text-left">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>

              <div>
                <h2 className="font-semibold text-neutral-900">
                  You're all set!
                </h2>
                <p className="mt-1 text-sm leading-6 text-neutral-600">
                  Your shopping cart has been cleared. You can continue
                  exploring our products whenever you're ready.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <Button
            
            className="mt-8 h-12 w-full rounded-xl text-base font-semibold shadow-sm"
          >
            <Link href="/products">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Continue Shopping
            </Link>
          </Button>

          <Link
            href="/"
            className="mt-5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
          >
            Back to Home
          </Link>

          {/* Footer */}
          <div className="mt-10 border-t border-neutral-100 pt-5">
            <p className="text-xs leading-5 text-neutral-400">
              Thank you for choosing our store. We hope to see you again!
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default PaymentSuccessPage;