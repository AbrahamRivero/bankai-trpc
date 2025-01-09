"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Save, Loader2 } from "lucide-react";
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
import { DASHBOARD_LOCATIONS_URL } from "@/lib/constants";
import { createLocationSchema } from "@/server/locations/location-schema";
import Link from "next/link";

const CreateLocationForm = () => {
  const form = useForm<z.infer<typeof createLocationSchema>>({
    resolver: zodResolver(createLocationSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const { mutate, isLoading } = trpc.createLocation.useMutation({
    onSettled: () => form.reset(),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          (data: z.infer<typeof createLocationSchema>) =>
            mutate({
              name: data.name,
              address: data.address,
            })
        )}
        className="mb-4"
      >
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Link
                href={DASHBOARD_LOCATIONS_URL}
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
                  Guardar Localización
                </span>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Detalles de la Localización
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
                                  placeholder="Nombre de la Localización..."
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
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Dirección</FormLabel>
                              <FormControl>
                                <Input
                                  className="w-full"
                                  placeholder="Dirección de la localización..."
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
              href={DASHBOARD_LOCATIONS_URL}
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

              <span className="sm:whitespace-nowrap">Guardar Localización</span>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateLocationForm;
