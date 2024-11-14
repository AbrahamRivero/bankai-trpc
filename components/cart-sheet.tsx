"use client";

import { useCartStore } from "@/store/cartStore";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Separator } from "./ui/separator";

export default function CartSheet() {
  const { items, removeItem, clearCart, getTotalItems, getTotalPrice } =
    useCartStore();

  return (
    <div className="flex flex-col h-full">
      <SheetHeader>
        <SheetTitle className="text-primary">Tu Carrito</SheetTitle>
      </SheetHeader>
      <div className="flex-grow overflow-auto py-4 flex justify-center items-center">
        {items.length === 0 ? (
          <p className="text-primary">Tu carrito está vacío</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4"
            >
              <div>
                <p className="text-primary-foreground">{item.name}</p>
                <p className="text-sm text-primary-foreground/70">
                  Cantidad: {item.quantity}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-primary-foreground mr-2">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <Button
                  onClick={() => removeItem(item.id)}
                  variant="destructive"
                  size="sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      {items.length > 0 && (
        <div className="mt-auto">
          <Separator className="my-4 bg-primary-foreground/20" />
          <div className="flex justify-between mb-4">
            <p className="text-primary-foreground">Total:</p>
            <p className="text-primary-foreground font-bold">
              ${getTotalPrice().toFixed(2)}
            </p>
          </div>
          <Button
            onClick={clearCart}
            variant="destructive"
            className="w-full mb-2"
          >
            Vaciar Carrito
          </Button>
          <Button className="w-full">Proceder al Pago</Button>
        </div>
      )}
    </div>
  );
}
