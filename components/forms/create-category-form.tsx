"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Save, Loader2, WandSparkles } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Textarea } from "../ui/textarea";
import { DASHBOARD_CATEGORIES_URL } from "@/lib/constants";
import { createCategorySchema } from "@/server/categories/categories-schema";
import { generateSlug } from "@/lib/utils";
import Link from "next/link";

const CreateCategoryForm = () => {
  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      slug: "",
      img_url: "",
    },
  });

  const { mutate, isLoading } = trpc.createCategory.useMutation({
    onSettled: () => {
      form.reset();
    },
  });

  const category_name = form.watch("name");

  const handleGenerateSlug = () => {
    if (!category_name) return;
    const slug = generateSlug(category_name);
    form.setValue("slug", slug);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          ({
            name,
            description,
            slug,
            img_url,
          }: z.infer<typeof createCategorySchema>) =>
            mutate({
              name,
              description,
              slug,
              img_url,
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                          name="slug"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Slug</FormLabel>
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <Input
                                    className="w-full"
                                    placeholder="Slug de la categoría..."
                                    disabled={!category_name}
                                    {...field}
                                  />
                                  <Button
                                    variant="outline"
                                    type="button"
                                    size="icon"
                                    onClick={handleGenerateSlug}
                                    disabled={!category_name}
                                  >
                                    <WandSparkles className="w-4 h-4" />
                                  </Button>
                                </div>
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
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                              <Textarea
                                className="min-h-32"
                                placeholder="Breve descripción del categoría..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
