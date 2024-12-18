import { Link, ShoppingCart } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import NextLink from "next/link";
import DiscountBadge from "./discount-badge";
import CountdownTimer from "./countdown-timer";

interface ProductCardProps {
  name: string;
  variantId: string;
  href: string;
  img_url: string | null;
  price: number;
  category?: string;
  discountPercentage: number;
  discountEndDate: Date | null;
}

const ProductCard = ({
  name,
  variantId,
  href,
  img_url,
  category,
  price,
  discountPercentage,
  discountEndDate,
}: ProductCardProps) => {
  const getFinalProductPrice = (price: number, discountPercentage?: number) => {
    if (!discountPercentage) return price;

    if (discountPercentage > 100) return 0;

    const discountAmount = (price * discountPercentage) / 100;
    const finalPrice = price - discountAmount;
    return finalPrice;
  };

  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="group relative">
      <div className="relative aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
        <img
          alt={name}
          src={img_url ? img_url : "https://placehold.co/600x400?text=No+Image"}
          className="object-cover object-center"
        />
        {discountPercentage > 0 && (
          <DiscountBadge percentage={discountPercentage} />
        )}
        {discountEndDate && (
          <CountdownTimer endDate={discountEndDate.toDateString()} />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 bg-black bg-opacity-0 transition-opacity md:group-hover:bg-opacity-20"
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 p-2 md:hidden">
          <div className="flex justify-between">
            <Button
              size="sm"
              variant="secondary"
              aria-label="Add to cart"
              onClick={() =>
                addItem({
                  id: variantId,
                  name: name,
                  price: price,
                  quantity: 1,
                })
              }
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <div className="flex space-x-2">
              <NextLink
                href={href}
                className={buttonVariants({
                  size: "icon",
                  variant: "secondary",
                })}
                aria-label="View product details"
              >
                <Link className="h-4 w-4" />
              </NextLink>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 left-2 right-2 z-20 hidden justify-between opacity-0 transition-opacity md:flex md:group-hover:opacity-100">
          <Button size="icon" variant="secondary" aria-label="Add to cart">
            <ShoppingCart className="h-4 w-4" />
          </Button>
          <div className="flex space-x-2">
            <NextLink
              href={href}
              className={buttonVariants({ size: "icon", variant: "secondary" })}
              aria-label="View product details"
            >
              <Link className="h-4 w-4" />
            </NextLink>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between space-x-8 text-base font-medium text-gray-900">
        <h3 className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          <span aria-hidden="true" className="absolute inset-0" />
          {name}
        </h3>
        <div className="text-right">
          <p className="font-bold">
            {getFinalProductPrice(price, discountPercentage)}
          </p>
        </div>
      </div>
      <p className="mt-1 text-sm text-gray-500">{category}</p>
    </div>
  );
};

export default ProductCard;
