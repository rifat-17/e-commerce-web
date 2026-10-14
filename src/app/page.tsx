
import Carousel from "@/components/Carousel";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { data: products } = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  const featuredProduct = products[0];
  const bannerImage = featuredProduct?.images?.[0];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 overflow-hidden rounded-3xl bg-neutral-100 px-6 py-12 sm:px-10 md:grid-cols-2 md:px-14 md:py-16">
          {/* Hero Content */}
          <div className="mx-auto max-w-xl space-y-6 text-center md:mx-0 md:text-left">
            <span className="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm">
              ✨ Discover something new
            </span>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              Find Your
              <span className="block text-neutral-500">
                Perfect Products
              </span>
            </h1>

            <p className="mx-auto max-w-md text-base leading-7 text-neutral-600 md:mx-0 md:text-lg">
              Discover quality products, explore the latest collections,
              and find everything you need in one place.
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
              <Button
                
                size="lg"
                className="rounded-full px-8"
              >
                <Link href="/products">
                  Browse Products
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                </Link>
              </Button>

              <Button
                
                size="lg"
                variant="outline"
                className="rounded-full border-neutral-300 bg-white px-8"
              >
                <Link href="#featured-products">
                  Explore Collection
                </Link>
              </Button>
            </div>

            <p className="text-sm text-neutral-500">
              Quality products. Simple shopping. Great experiences.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm sm:p-10">
            {bannerImage ? (
              <Image
                src={bannerImage}
                alt={featuredProduct.name || "Featured product"}
                width={600}
                height={600}
                priority
                className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
            ) : (
              <div className="flex h-full min-h-64 w-full items-center justify-center text-neutral-400">
                <span className="text-6xl" aria-hidden="true">
                  🛍️
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section
        id="featured-products"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
              Handpicked for you
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Featured Products
            </h2>

            <p className="text-sm leading-6 text-neutral-600 sm:text-base">
              Explore some of our latest products and collections.
            </p>
          </div>

          <Button
            
            variant="outline"
            className="w-fit rounded-full"
          >
            <Link href="/products">
              View All Products →
            </Link>
          </Button>
        </div>

        <Carousel products={products} />
      </section>

      {/* Bottom Call to Action */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-3xl bg-neutral-900 px-6 py-10 text-center text-white sm:px-10 md:flex-row md:text-left">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready to find your next favorite?
            </h2>

            <p className="text-sm leading-6 text-neutral-300 sm:text-base">
              Browse our complete collection and discover more.
            </p>
          </div>

          <Button
            
            size="lg"
            className="shrink-0 rounded-full bg-white px-8 text-neutral-900 hover:bg-neutral-200"
          >
            <Link href="/products">Shop Now →</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
