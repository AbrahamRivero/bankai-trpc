import { usePathname } from "next/navigation";

function formatSegment(segment: string): string {
  // Diccionario de traducciones específicas
  const translations: { [key: string]: string } = {
    products: "Productos",
    events: "Eventos",
  };

  // Comprobar si el segmento tiene una traducción específica
  if (translations[segment.toLowerCase()]) {
    return translations[segment.toLowerCase()];
  }

  // Eliminar guiones y aplicar capitalize a cada palabra
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function useUrlSegments() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return ["Inicio", ...segments].map((segment, index, array) => ({
    name: index === 0 ? segment : formatSegment(segment),
    href: index === 0 ? "/" : `/${array.slice(1, index + 1).join("/")}`,
    isCurrent: index === array.length - 1,
  }));
}
