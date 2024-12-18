"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Save, Loader2, Plus, X, Trash2, Check } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState, useCallback, useEffect } from "react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { motion } from "framer-motion";
import { HexColorPicker } from "react-colorful";
import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpc";
import { DateRangePicker } from "./date-range-picker";
import { Textarea } from "./ui/textarea";
import { DASHBOARD_PRODUCTS_URL } from "@/lib/constants";
import { createProductSchema } from "../server/products/products-schema";
import Link from "next/link";

const CreateProductForm = () => {
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState("#ffffff");

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      base_price: 0,
      base_cost: 0,
      category_id: "",
      variants: [
        {
          status: "draft",
          stock: 0,
          sizes: [],
          colors: [],
          price: 0,
          cost: 0,
          discount: 0,
          permanent_discount: false,
          img_url: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const sizes = [
    {
      id: "XS",
      label: "XS",
    },
    {
      id: "S",
      label: "S",
    },
    {
      id: "M",
      label: "M",
    },
    {
      id: "L",
      label: "L",
    },
    {
      id: "XL",
      label: "XL",
    },
    {
      id: "XXL",
      label: "XXL",
    },
  ] as const;

  const { mutate, isLoading } = trpc.createProduct.useMutation({
    onSettled: () => {
      form.reset();
    },
  });

  const addCustomColor = useCallback(() => {
    if (!customColors.includes(currentColor)) {
      setCustomColors((prevColors) => [...prevColors, currentColor]);
    }
    setShowColorPicker(false);
  }, [currentColor, customColors]);

  useEffect(() => {
    const basePrice = form.getValues("base_price");
    const baseCost = form.getValues("base_cost");
    const variants = form.getValues("variants");

    if (variants.length > 0) {
      form.setValue("variants.0", {
        ...variants[0],
        price: basePrice,
        cost: baseCost,
      });
    }
  }, [form.watch("base_price"), form.watch("base_cost")]);

  const handleColorToggle = useCallback(
    (index: number, color: string) => {
      const currentColors = form.getValues(`variants.${index}.colors`) || [];
      const updatedColors = currentColors.includes(color)
        ? currentColors.filter((c) => c !== color)
        : [...currentColors, color];
      form.setValue(`variants.${index}.colors`, updatedColors);
    },
    [form]
  );

  const { data } = trpc.getCategories.useQuery();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          (data: z.infer<typeof createProductSchema>) =>
            mutate({
              name: data.name,
              description: data.description,
              base_cost: data.base_cost,
              base_price: data.base_price,
              category_id: data.category_id,
              variants: data.variants,
            })
        )}
        className="mb-4"
      >
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Link
                href={DASHBOARD_PRODUCTS_URL}
                className={buttonVariants({ size: "sm", variant: "outline" })}
              >
                Descartar
              </Link>
              <Button disabled={isLoading} type="submit" size="sm">
                {isLoading ? (
                  <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                ) : (
                  <Save className="h-3.5 w-3.5 mr-2" />
                )}

                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Guardar Producto
                </span>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Detalles del Producto
                  </CardTitle>
                  <CardDescription>
                    Introduzca los datos correspondientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre</FormLabel>
                              <FormControl>
                                <Input
                                  className="w-full"
                                  placeholder="Nombre del Producto..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="category_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Categoría</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona una categoría" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {data?.map((category) => (
                                    <SelectItem
                                      key={category.id}
                                      value={category.id}
                                    >
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                              <Textarea
                                className="min-h-32"
                                placeholder="Breve descripción del producto..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="base_price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Precio Base</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  className="w-full"
                                  placeholder="Precio base del producto..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="base_cost"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Costo Base</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  className="w-full"
                                  placeholder="Costo base del producto..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Variantes</Label>

                      {fields.map((field, index) => (
                        <motion.div
                          key={field.id}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          className="p-4 border rounded-md mt-4 grid gap-6"
                        >
                          <div className="grid grid-cols-2 gap-5">
                            <div className="grid gap-3">
                              <FormField
                                control={form.control}
                                name={`variants.${index}.price`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Precio</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        className="w-full"
                                        placeholder="Precio del producto..."
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grid gap-3">
                              <FormField
                                control={form.control}
                                name={`variants.${index}.cost`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Costo</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        className="w-full"
                                        placeholder="Costo del producto..."
                                        {...field}
                                        readOnly={index === 0}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-2">
                            <div className="grid gap-3">
                              <FormField
                                control={form.control}
                                name={`variants.${index}.img_url`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Imagen (URL)</FormLabel>
                                    <FormControl>
                                      <Input
                                        className="w-full"
                                        placeholder="URL de la imagen del producto..."
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grip gap-3">
                              <FormField
                                control={form.control}
                                name={`variants.${index}.discount`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Descuento (%)</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        className="w-full"
                                        placeholder="Descuento del producto..."
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="grip gap-3">
                              <FormField
                                control={form.control}
                                name={`variants.${index}.permanent_discount`}
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 gap-2">
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-base">
                                        Descuento Permanente
                                      </FormLabel>
                                      <FormDescription>
                                        ¿Es un descuento permanente?
                                      </FormDescription>
                                    </div>
                                    <FormControl>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>

                            {!form.watch(
                              `variants.${index}.permanent_discount`
                            ) && (
                              <div className="grip gap-3">
                                <FormField
                                  control={form.control}
                                  name={`variants.${index}.discountDateRange`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        Fecha límite del descuento
                                      </FormLabel>
                                      <FormControl>
                                        <DateRangePicker
                                          from={field.value?.from}
                                          to={field.value?.to}
                                          onSelect={(range) =>
                                            field.onChange(range)
                                          }
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            )}

                            <div className="grid gap-3">
                              <FormField
                                control={form.control}
                                name={`variants.${index}.status`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Selecciona status" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="draft">
                                          Borrador
                                        </SelectItem>
                                        <SelectItem value="active">
                                          Activo
                                        </SelectItem>
                                        <SelectItem value="archived">
                                          Archivado
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grid gap-3">
                              <FormField
                                control={form.control}
                                name={`variants.${index}.stock`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Stock</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        className="w-full"
                                        placeholder="Cant. del producto..."
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name={`variants.${index}.colors`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Colores (opcional)</FormLabel>
                                  <FormControl>
                                    <ToggleGroup
                                      type="multiple"
                                      onValueChange={field.onChange}
                                      value={field.value}
                                      className="flex flex-wrap justify-start gap-2"
                                    >
                                      {[
                                        {
                                          value: "#ffffff",
                                          className: "bg-white",
                                        },
                                        {
                                          value: "#000000",
                                          className: "bg-black",
                                        },
                                        {
                                          value: "#dc2626",
                                          className: "bg-red-600",
                                        },
                                        ...customColors.map((color) => ({
                                          value: color,
                                          style: { backgroundColor: color },
                                        })),
                                      ].map(({ value }) => (
                                        <ToggleGroupItem
                                          key={value}
                                          value={value}
                                          onClick={() =>
                                            handleColorToggle(index, value)
                                          }
                                          className={cn(
                                            "w-8 h-8 rounded-full border-2 relative",
                                            field.value.includes(value)
                                              ? "border-primary"
                                              : "border-gray-300"
                                          )}
                                          style={{ backgroundColor: value }}
                                        >
                                          {field.value.includes(value) && (
                                            <Check
                                              className={`absolute inset-0 m-auto w-4 h-4 ${
                                                ["#ffffff", "#ffff00"].includes(
                                                  value
                                                )
                                                  ? "text-black"
                                                  : "text-white"
                                              }`}
                                            />
                                          )}
                                        </ToggleGroupItem>
                                      ))}
                                      <Dialog
                                        open={showColorPicker}
                                        onOpenChange={setShowColorPicker}
                                      >
                                        <DialogTrigger asChild>
                                          <Button
                                            type="button"
                                            size="icon"
                                            variant="ghost"
                                            onClick={() =>
                                              setShowColorPicker(true)
                                            }
                                          >
                                            <Plus className="w-4 h-4" />
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                          <DialogHeader>
                                            <DialogTitle>
                                              Paleta de Colores
                                            </DialogTitle>
                                            <DialogDescription>
                                              Seleccione el color que desea
                                              añadir en caso de que este no
                                              exista en los valores
                                              predefinidos.
                                            </DialogDescription>
                                          </DialogHeader>
                                          <div className="flex items-center justify-center space-x-2">
                                            <div className="mt-4">
                                              <HexColorPicker
                                                color={currentColor}
                                                onChange={setCurrentColor}
                                              />
                                              <div className="mt-2 flex justify-center">
                                                <Input
                                                  type="text"
                                                  value={currentColor}
                                                  onChange={(e) =>
                                                    setCurrentColor(
                                                      e.target.value
                                                    )
                                                  }
                                                  className="w-1/2"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <DialogFooter className="sm:justify-between gap-2">
                                            <DialogClose asChild>
                                              <Button
                                                type="button"
                                                variant="secondary"
                                                onClick={() =>
                                                  setShowColorPicker(false)
                                                }
                                              >
                                                Cerrar
                                              </Button>
                                            </DialogClose>
                                            <Button
                                              type="button"
                                              onClick={addCustomColor}
                                            >
                                              Añadir Color
                                            </Button>
                                          </DialogFooter>
                                        </DialogContent>
                                      </Dialog>
                                    </ToggleGroup>
                                  </FormControl>
                                  <FormDescription>
                                    Selecciona un color o deja sin seleccionar
                                    para omitir.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="flex flex-wrap gap-2 mb-4">
                              {form
                                .watch(`variants.${index}.colors`)
                                ?.map((color, colorIndex) => (
                                  <div
                                    key={colorIndex}
                                    className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                                  >
                                    <div
                                      className="w-4 h-4 rounded-full mr-2"
                                      style={{ backgroundColor: color }}
                                    ></div>
                                    <span className="text-sm">{color}</span>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="ml-2 h-auto p-0"
                                      onClick={() =>
                                        handleColorToggle(index, color)
                                      }
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name={`variants.${index}.sizes`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Tallas (opcional)</FormLabel>
                                  <FormControl>
                                    <ToggleGroup
                                      type="multiple"
                                      onValueChange={field.onChange}
                                      value={field.value}
                                      className="flex flex-wrap justify-start gap-2"
                                    >
                                      {sizes.map((size) => (
                                        <ToggleGroupItem
                                          key={size.id}
                                          value={size.id}
                                          aria-label={`Tamaño ${size.label}`}
                                          className="flex-grow w-8 h-8 sm:flex-grow-0"
                                        >
                                          {size.label}
                                        </ToggleGroupItem>
                                      ))}
                                    </ToggleGroup>
                                  </FormControl>
                                  <FormDescription>
                                    Selecciona un tamaño o deja sin seleccionar
                                    para omitir.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="flex justify-end">
                            <Button
                              type="button"
                              onClick={() => remove(index)}
                              className="w-full sm:w-fit"
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                            </Button>
                          </div>
                        </motion.div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          const basePrice = form.getValues("base_price");
                          const baseCost = form.getValues("base_cost");
                          append({
                            colors: [],
                            price: basePrice,
                            cost: baseCost,
                            discount: 0,
                            permanent_discount: false,
                            sizes: [],
                            status: "draft",
                            stock: 0,
                          });
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Añadir Variante
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 md:hidden">
            <Link
              href={DASHBOARD_PRODUCTS_URL}
              className={buttonVariants({ size: "sm", variant: "outline" })}
            >
              Descartar
            </Link>
            <Button disabled={isLoading} type="submit" size="sm">
              {isLoading ? (
                <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5 mr-2" />
              )}

              <span className="sm:whitespace-nowrap">Guardar Producto</span>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateProductForm;
