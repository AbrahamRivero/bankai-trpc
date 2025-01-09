"use client";

import { useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const phoneRegex = new RegExp(/^5\d{7}$/);

const formSchema = z.object({
  name: z.string({ required_error: "Este campo es requerido." }).min(2, {
    message: "Nombre debe contener al menos 2 caractéres.",
  }),
  phone: z
    .string({
      required_error: "Este campo es requerido.",
      invalid_type_error: "Teléfono solo puede contener números.",
    })
    .regex(phoneRegex, { message: "Teléfono no es válido." })
    .min(8, { message: "Teléfono no debe contener menos de 8 números." })
    .max(8, {
      message: "Teléfono no debe contener más de 8 números.",
    }),
  message: z.string({ required_error: "Este campo es requerido." }).min(2, {
    message: "Mensaje debe contener al menos 2 caractéres.",
  }),
});

export default function ContactUs() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const message = `Me llamo ${values.name}, mi número es ${values.phone}. ${values.message}`;

    const textEncode = encodeURIComponent(message);

    try {
      window.open(`https://wa.me/58113443?text=${textEncode}`, "_blank");
    } catch (error) {
      console.error(error);
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      form.reset();
    }, 3000);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex justify-center flex-wrap bg-slate-50"
    >
      <main className="container mx-auto px-4 sm:px-7 py-8">
        <Card className="border-none shadow-none bg-slate-50">
          <CardHeader className="items-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CardTitle className="text-3xl font-bold text-center mb-1 text-black">
                Póngase en contacto con nosotros
              </CardTitle>
            </motion.div>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <CardDescription className="sm:max-w-xl max-w-sm text-center">
                Para más información acerca de nuestros{" "}
                <span className="text-blue-600">Productos & Servicios</span>,
                por favor, sienta la libertad de escribirnos, nuestro{" "}
                <span className="text-blue-600">Equipo</span> siempre estará
                disponible para ayudarlo.
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="p-4 sm:p-6"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-black">
                Envíanos un mensaje
              </h2>
              {isSubmitted ? (
                <motion.div
                  className="text-green-600 text-center py-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CircleCheckBig className="mx-auto w-16 h-16 mb-4" />
                  <p className="text-xl font-semibold">
                    ¡Gracias por tu mensaje!
                  </p>
                  <p>Nos pondremos en contacto contigo pronto.</p>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Tu nombre" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Tu móvil"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensaje</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tu mensaje aquí..."
                              className="h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full sm:w-fit">
                      Enviar Mensaje
                    </Button>
                  </form>
                </Form>
              )}
            </motion.div>

            <motion.div
              className="p-4 sm:p-6"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-black">
                Ubicación
              </h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.45232882296!2d-81.29116002592185!3d23.117136112795055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d30900360ebc89%3A0xf8805aefad604d36!2sTienda%20BANKAI%20(Art%C3%ADculos%20Anime%20y%20Juguetes)!5e0!3m2!1sen!2sus!4v1736090267971!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-md shadow-md border-none"
                ></iframe>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </main>
    </motion.div>
  );
}
