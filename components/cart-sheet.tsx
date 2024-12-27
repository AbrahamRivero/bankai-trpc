"use client";

import { SheetHeader, SheetTitle, SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";
import { CartItem } from "./cart-item";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";
import useCartStore from "@/store/cartStore";

export default function CartSheet() {
  const { items, clearCart, getTotalItems, getTotalPrice } = useCartStore();

  const { toast } = useToast();

  const handleCheckout = () => {
    const products = items
      .map((item) => item.name + ` x${item.quantity}`)
      .join(", ");

    const message = `Hola, me interesan ${
      items.length > 1 && items.length !== 0
        ? "estos productos"
        : "este producto"
    }: ${products}`;

    const text = encodeURIComponent(message);

    try {
      window.open(`https://wa.me/58113443?text=${text}`, "_blank");
    } catch (error: any) {
      toast({ title: "Error", description: error });
      return;
    }

    toast({ description: "Enviando mensaje!" });
  };

  return (
    <div className="flex flex-col h-full">
      <SheetHeader>
        <SheetTitle className="text-primary">Tu Carrito</SheetTitle>
      </SheetHeader>
      <div className="flex-grow overflow-auto py-4 flex justify-center items-center flex-wrap content-start">
        {items.length === 0 ? (
          <p className="text-primary">Tu carrito está vacío</p>
        ) : (
          items.map(({ id, name, price, quantity, img_url }) => (
            <CartItem
              key={id}
              id={id}
              name={name}
              price={price}
              quantity={quantity}
              img_url={img_url}
            />
          ))
        )}
      </div>
      <Separator />
      <div className="px-4 py-6 sm:px-6">
        {items.length > 0 && (
          <>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{`$${getTotalPrice().toFixed(2)}`}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Cant. Productos</p>
              <p>{getTotalItems()}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              El costo del servicio a domicilio es acordado con el vendedor.
            </p>
            <div className="mt-6">
              <Button onClick={handleCheckout} size="lg" className="w-full">
                Contactar
              </Button>
            </div>
          </>
        )}

        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <SheetClose
            type="button"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Continuar Comprando
            <span aria-hidden="true"> &rarr;</span>
          </SheetClose>
        </div>
      </div>
    </div>
  );
}
