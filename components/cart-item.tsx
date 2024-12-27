import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import useCartStore from "@/store/cartStore";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  img_url?: string | null;
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  img_url,
}) => {
  const { addItem, removeItem } = useCartStore();

  const handleIncrement = () => {
    addItem({ id, name, price, quantity: 1, img_url });
  };

  const handleDecrement = () => {
    removeItem(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-center space-x-4 p-3">
            <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={
                  img_url
                    ? img_url
                    : "https://placehold.co/600x400?text=No+Image"
                }
                alt={name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
            <div className="flex-grow h-24">
              <h3 className="font-semibold text-base text-primary">{name}</h3>
              <p className="text-muted-foreground">${price.toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-end space-y-2 h-24 justify-between">
              <p className="font-semibold text-sm text-primary">
                ${(price * quantity).toFixed(2)}
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDecrement}
                  aria-label={
                    quantity === 1
                      ? `Eliminar ${name} del carrito`
                      : `Disminuir cantidad de ${name}`
                  }
                  className="h-6 w-6 rounded-full"
                >
                  {quantity === 1 ? (
                    <Trash2 className="h-4 w-4" />
                  ) : (
                    <Minus className="h-4 w-4" />
                  )}
                </Button>
                <span className="w-6 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleIncrement}
                  aria-label={`Aumentar cantidad de ${name}`}
                  className="h-6 w-6 rounded-full"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
