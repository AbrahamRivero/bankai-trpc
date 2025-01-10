"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ServiceCard = ({
  index,
  img_url,
  title,
  description,
}: {
  index: number;
  img_url: string;
  title: string;
  description: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 text-center rounded-lg bg-slate-50 shadow-lg hover:shadow-xl transition-shadow p-2"
    >
      <Image
        src={img_url}
        alt={title}
        height={50}
        width={50}
        className="object-cover"
      />

      <div className="w-3/4 text-start">
        <h3 className="text-base font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
