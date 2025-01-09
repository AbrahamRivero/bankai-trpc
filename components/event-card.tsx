import { CalendarIcon, ArrowRightIcon, Clock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { formatDateEvents, formatTo12Hours } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import LocationContainer from "./location-container";

export default function EventCard({
  slug,
  name,
  subtitle,
  description,
  date,
  location,
  event_img,
}: {
  slug: string | null;
  name: string;
  subtitle?: string;
  description: string | null;
  date: Date;
  location: { name: string; address: string } | null;
  event_img: string | null;
}) {
  return (
    <Card className="w-full max-w-md overflow-hidden">
      <div className="relative h-48">
        <div className="relative w-full h-48">
          <Image
            alt="Evento de la tienda"
            className="object-cover"
            src={
              event_img
                ? event_img
                : "https://placehold.co/600x400?text=No+Image"
            }
            fill
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white line-clamp-2">{name}</h3>
          <p className="text-sm text-white/90">
            {subtitle
              ? subtitle
              : "¡No te pierdas nuestras ofertas especiales!"}
          </p>
        </div>
      </div>
      <CardContent className="grid gap-4 p-4">
        <div className="flex items-center space-x-2 text-sm">
          <CalendarIcon className="w-4 h-4" />
          <span>{formatDateEvents(date)}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="w-4 h-4" />
          <span>{formatTo12Hours(date)}</span>
        </div>
        <LocationContainer location={location} />
        <AspectRatio ratio={16 / 9} className="text-sm">
          {description
            ? description
            : "Ven y disfruta de nuestra colección. Desde ropa hasta coleccionables, ¡tenemos todo lo que necesitas para esta temporada!"}
        </AspectRatio>
      </CardContent>
      <CardFooter className="p-4">
        <Link
          href={`/events/${slug}`}
          className={buttonVariants({ className: "w-full" })}
        >
          Más información
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Link>
      </CardFooter>
    </Card>
  );
}
