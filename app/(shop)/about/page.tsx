"use client";

import { motion } from "framer-motion";
import { ArrowRight, Package, Users, Smartphone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function AboutUs() {
  const timeline = [
    {
      date: "2010",
      dateTime: "2010-01-01",
      name: "El nacimiento de una pasión",
      description:
        "Abrimos nuestra primera tienda física, un pequeño local lleno de figuras de anime y merchandising friki.",
    },
    {
      date: "2015",
      dateTime: "2015-01-01",
      name: "Crecimiento y expansión",
      description:
        "Nos mudamos a un local más grande y ampliamos nuestra selección de productos, incluyendo cómics y juegos de mesa.",
    },
    {
      date: "2020",
      dateTime: "2020-01-01",
      name: "El salto al mundo digital",
      description:
        "Lanzamos nuestra tienda online, llevando la experiencia Bankai Project a todo el país.",
    },
    {
      date: "2023",
      dateTime: "2023-01-01",
      name: "La era móvil",
      description:
        "Desarrollamos nuestra aplicación móvil, ofreciendo una experiencia de compra personalizada y acceso exclusivo a productos.",
    },
  ];

  const features = [
    {
      title: "Productos Exclusivos",
      description:
        "Ofrecemos figuras y merchandising que no encontrarás en ningún otro lugar.",
      icon: Package,
    },
    {
      title: "Comunidad Activa",
      description:
        "Organizamos eventos, torneos y encuentros para nuestros clientes.",
      icon: Users,
    },
    {
      title: "Experiencia Omnicanal",
      description:
        "Disfruta de una experiencia fluida entre nuestra tienda física, online y móvil.",
      icon: Smartphone,
    },
  ];

  return (
    <div className="mb-12 mt-28 sm:mt-40 px-6 flex flex-col items-center justify-center">
      <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
        <p className="text-sm font-semibold text-gray-700">
          Descubre la evolución de Bankai Project
        </p>
      </div>

      <motion.h1
        className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        De tienda local a{" "}
        <span className="text-blue-600">experiencia digital</span>
      </motion.h1>

      <motion.div
        className="relative w-full h-64 md:h-96 mb-12 rounded-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="https://ucarecdn.com/4ef02b0d-1d56-49c0-a778-2db822331241/photo_20250105_104811.jpg"
          alt="Bankai Project storefront"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-2xl font-bold">Nuestra primera tienda</p>
          <p>Donde todo comenzó</p>
        </div>
      </motion.div>

      <section className="mb-12 w-full">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Nuestra Evolución
        </h2>
        <div className="mx-auto mt-8 lg:-mt-8 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {timeline.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <time
                  dateTime={item.dateTime}
                  className="flex items-center text-sm/6 font-semibold text-blue-600"
                >
                  <svg
                    viewBox="0 0 4 4"
                    aria-hidden="true"
                    className="mr-4 size-1 flex-none"
                  >
                    <circle r={2} cx={2} cy={2} fill="currentColor" />
                  </svg>
                  {item.date}
                  <div
                    aria-hidden="true"
                    className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                  />
                </time>
                <p className="mt-6 text-lg/8 font-semibold tracking-tight text-gray-900">
                  {item.name}
                </p>
                <p className="mt-1 text-base/7 text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12 w-full">
        <h2 className="text-3xl font-bold mb-8 text-center">Nuestra Misión</h2>
        <motion.div
          className="bg-gray-100 p-8 rounded-lg max-w-4xl mx-auto"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg text-center">
            En Bankai Project, nos dedicamos a crear un espacio donde la pasión
            por el anime, el manga y la cultura friki florezca. Buscamos ofrecer
            no solo productos de calidad, sino también una comunidad vibrante
            donde los fans puedan conectar, compartir y celebrar sus intereses.
          </p>
        </motion.div>
      </section>

      <section className="mb-12 w-full">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Lo Que Nos Hace Únicos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Link
        className={buttonVariants({
          size: "lg",
          className: "mt-8",
        })}
        href="/products"
      >
        Explora Nuestra Colección <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </div>
  );
}
