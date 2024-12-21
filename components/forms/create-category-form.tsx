"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { motion } from "framer-motion";
import { HexColorPicker } from "react-colorful";
import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpc";
import { DateRangePicker } from "../date-range-picker";
import { Textarea } from "../ui/textarea";
import { DASHBOARD_CATEGORIES_URL } from "@/lib/constants";
import { createCategorySchema } from "@/server/categories/categories-schema";
import Link from "next/link";

const CreateCategoryForm = () => {
  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      type: undefined,
      img_url: "",
    },
  });

  const { mutate, isLoading } = trpc.createCategory.useMutation({
    onSettled: () => {
      form.reset();
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          (data: z.infer<typeof createCategorySchema>) =>
            mutate({
              name: data.name,
              img_url: data.img_url,
              type: data.type,
            })
        )}
        className="mb-4"
      >
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Link
                href={DASHBOARD_CATEGORIES_URL}
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
                  Guardar Categoría
                </span>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Detalles de la Categoría
                  </CardTitle>
                  <CardDescription>
                    Introduzca los datos correspondientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                                  placeholder="Nombre de la Categoría..."
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
                          name="img_url"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Imagen (URL)</FormLabel>
                              <FormControl>
                                <Input
                                  className="w-full"
                                  placeholder="URL de la imagen de la Categoría..."
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
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tipo de Categoría</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecciona tipo" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="product">
                                    Producto
                                  </SelectItem>
                                  <SelectItem value="event">Evento</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 md:hidden">
            <Link
              href={DASHBOARD_CATEGORIES_URL}
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

              <span className="sm:whitespace-nowrap">Guardar Categoría</span>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateCategoryForm;
