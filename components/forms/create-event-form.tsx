"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { createEventSchema } from "../../server/events/events-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/lib/trpc";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Clock,
  Loader2,
  Save,
} from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { DASHBOARD_EVENTS_URL } from "@/lib/constants";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import Link from "next/link";

const CreateEventForm = () => {
  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      name: "",
      description: "",
      cover_price: 0,
      location_id: "",
      category_id: "",
    },
  });

  const { mutate, isLoading } = trpc.createEvent.useMutation({
    onSettled: () => form.reset(),
  });

  const { data: categories } = trpc.getCategoriesByType.useQuery({
    type: "event",
  });
  const { data: locations } = trpc.getLocations.useQuery();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data: z.infer<typeof createEventSchema>) =>
          mutate({
            name: data.name,
            description: data.description,
            event_img: data.event_img,
            cover_price: data.cover_price,
            location_id: data.location_id,
            category_id: data.category_id,
            date: data.date,
          })
        )}
        className="mb-4"
      >
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Link
                href={DASHBOARD_EVENTS_URL}
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
                  Guardar Evento
                </span>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Detalles del Evento
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
                                  placeholder="Nombre del Evento..."
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
                          name="event_img"
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
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="category_id"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Categoría</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "justify-between",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? categories?.find(
                                            (category) =>
                                              category.id === field.value
                                          )?.name
                                        : "Seleccione una categoría"}
                                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Busca una categoría..." />
                                    <CommandList>
                                      <CommandEmpty>
                                        No hay resultados.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {categories?.map((category) => (
                                          <CommandItem
                                            value={category.id}
                                            key={category.id}
                                            onSelect={() => {
                                              form.setValue(
                                                "category_id",
                                                category.id
                                              );
                                            }}
                                          >
                                            {category.name}
                                            <Check
                                              className={cn(
                                                "ml-auto",
                                                category.id === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="location_id"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Localización</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        "justify-between",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? locations?.find(
                                            (location) =>
                                              location.id === field.value
                                          )?.name
                                        : "Seleccione una localización"}
                                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Busca una localización..." />
                                    <CommandList>
                                      <CommandEmpty>
                                        No hay resultados.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {locations?.map((location) => (
                                          <CommandItem
                                            value={location.id}
                                            key={location.id}
                                            onSelect={() => {
                                              form.setValue(
                                                "location_id",
                                                location.id
                                              );
                                            }}
                                          >
                                            {location.name}
                                            <Check
                                              className={cn(
                                                "ml-auto",
                                                location.id === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
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
                                placeholder="Breve descripción del evento..."
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
                          name="cover_price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Precio del Cover</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  className="w-full"
                                  placeholder="Precio del cover..."
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
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col justify-end">
                              <FormLabel>Fecha y Hora</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP HH:mm")
                                      ) : (
                                        <span>Seleccionar fecha y hora</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={(date) => {
                                      setSelectedDate(date);
                                      if (date) {
                                        const currentDateTime =
                                          field.value || new Date();
                                        const newDateTime = new Date(date);
                                        newDateTime.setHours(
                                          currentDateTime.getHours()
                                        );
                                        newDateTime.setMinutes(
                                          currentDateTime.getMinutes()
                                        );
                                        field.onChange(newDateTime);
                                      }
                                    }}
                                    disabled={(date) =>
                                      date >
                                        new Date(
                                          new Date().setFullYear(
                                            new Date().getFullYear() + 1
                                          )
                                        ) || date < new Date()
                                    }
                                    initialFocus
                                  />
                                  <div className="p-3 border-t border-border">
                                    <div className="flex items-center space-x-2">
                                      <Clock className="h-4 w-4 opacity-50" />
                                      <Select
                                        onValueChange={(time) => {
                                          if (!time) return;
                                          const [hours, minutes] =
                                            time.split(":");
                                          const newDateTime = new Date(
                                            field.value ||
                                              selectedDate ||
                                              new Date()
                                          );
                                          newDateTime.setHours(parseInt(hours));
                                          newDateTime.setMinutes(
                                            parseInt(minutes)
                                          );
                                          field.onChange(newDateTime);
                                        }}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Seleccionar hora" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {Array.from({ length: 24 * 4 }).map(
                                            (_, index) => {
                                              const hours = Math.floor(
                                                index / 4
                                              );
                                              const minutes = (index % 4) * 15;
                                              const timeString = `${hours
                                                .toString()
                                                .padStart(2, "0")}:${minutes
                                                .toString()
                                                .padStart(2, "0")}`;
                                              return (
                                                <SelectItem
                                                  key={index}
                                                  value={timeString}
                                                >
                                                  {timeString}
                                                </SelectItem>
                                              );
                                            }
                                          )}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
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
              href={DASHBOARD_EVENTS_URL}
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

              <span className="sm:whitespace-nowrap">Guardar Evento</span>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateEventForm;
