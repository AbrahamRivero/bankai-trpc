"use client";

import { useState } from "react";
import { Check, ChevronRight, Shield, Star, XCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormMessage,
  FormLabel,
} from "./ui/form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { cn, formatPrice } from "@/lib/utils";
import useCartStore from "@/store/cartStore";
import { Breadcrumb } from "./layout/navigation/breadcrumb";

const product = {
  name: "Everyday Ruck Snack",
  href: "#",
  price: "$220",
  description:
    "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
  imageSrc:
    "https://tailwindui.com/plus/img/ecommerce-images/product-page-04-featured-product-shot.jpg",
  imageAlt:
    "Model wearing light green backpack with black canvas straps and front zipper pouch.",
  breadcrumbs: [
    { id: 1, name: "Travel", href: "#" },
    { id: 2, name: "Bags", href: "#" },
  ],
  sizes: [
    { name: "18L", description: "Perfect for a reasonable amount of snacks." },
    { name: "20L", description: "Enough room for a serious amount of snacks." },
  ],
};

export default function ProductOverview({ slug }: { slug: string }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].name);

  const { data, isFetching } = trpc.getProductBySlug.useQuery({ slug });

  const selectedProduct = data?.product;
  const reviews = selectedProduct?.reviews;
  const totalReviews = reviews?.length;
  const averageRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, review) => sum + Number(review.rating), 0) /
        reviews.length
      : 0;

  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    addItem({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: Number(selectedProduct.price),
      quantity: 1,
      img_url: selectedProduct.img_url,
    });
  };

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <Breadcrumb />

          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {selectedProduct?.name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Información del producto
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-foreground sm:text-xl">
                {selectedProduct ? formatPrice(selectedProduct.price) : 0}
              </p>

              <div className="ml-4 border-l border-border pl-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => {
                        return (
                          <Star
                            key={rating}
                            className={cn(
                              averageRating > rating
                                ? "text-yellow-400"
                                : "text-muted-foreground",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        );
                      })}
                    </div>
                    <p className="sr-only">{averageRating} out of 5 stars</p>
                  </div>
                  <p className="ml-2 text-sm text-muted-foreground">
                    {totalReviews} reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-muted-foreground">
                {selectedProduct?.description}
              </p>
            </div>

            <div className="mt-6 flex items-center">
              {selectedProduct && selectedProduct.stock > 0 ? (
                <>
                  <Check
                    className="h-5 w-5 flex-shrink-0 text-green-500"
                    aria-hidden="true"
                  />
                  <p className="ml-2 text-sm text-muted-foreground">
                    En stock y listo para enviar
                  </p>
                </>
              ) : (
                <>
                  <XCircle
                    className="h-5 w-5 flex-shrink-0 text-red-500"
                    aria-hidden="true"
                  />
                  <p className="ml-2 text-sm text-muted-foreground">
                    No disponible en este momento
                  </p>
                </>
              )}
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center shadow-md">
          <img
            src={selectedProduct?.img_url}
            alt={selectedProduct?.name}
            className="rounded-lg object-cover object-center"
          />
        </div>

        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Product options
            </h2>

            <form>
              <div className="sm:flex sm:justify-between">
                {selectedProduct && selectedProduct.sizes.length > 0 ? (
                  <>
                    {/* Size selector */}
                    <div className="mt-1">
                      <Label className="text-base font-semibold text-foreground">
                        Talla
                      </Label>
                      <RadioGroup
                        value={selectedSize}
                        onValueChange={setSelectedSize}
                        className="mt-2"
                      >
                        {selectedProduct.sizes.map((size, idx) => (
                          <div
                            key={`${size} ${idx}`}
                            className="flex items-center space-x-3"
                          >
                            <RadioGroupItem value={size} id={size} />
                            <Label
                              htmlFor={size}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {size}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="mt-10">
                <Button type="button" size="lg" onClick={handleAddToCart}>
                  Añadir al carrito
                </Button>
              </div>
              <div className="mt-6 text-center">
                <a href="#" className="group inline-flex text-base font-medium">
                  <Shield
                    className="mr-2 h-6 w-6 flex-shrink-0 text-muted-foreground group-hover:text-foreground"
                    aria-hidden="true"
                  />
                  <span className="text-muted-foreground group-hover:text-foreground">
                    Calidad Garantizada
                  </span>
                </a>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
