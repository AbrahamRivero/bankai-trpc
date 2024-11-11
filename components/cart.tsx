// components/Cart.tsx
"use client";

import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Cart() {
  const { items, removeItem, clearCart, getTotalItems, getTotalPrice } =
    useCartStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shopping Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2"
              >
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <Button
                  onClick={() => removeItem(item.id)}
                  variant="destructive"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            ))}
            <div className="mt-4">
              <p>Total Items: {getTotalItems()}</p>
              <p>Total Price: ${getTotalPrice().toFixed(2)}</p>
            </div>
            <Button onClick={clearCart} className="mt-4">
              Clear Cart
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
