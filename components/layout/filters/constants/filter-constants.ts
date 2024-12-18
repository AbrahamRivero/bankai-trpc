import { PackagePlus, ArrowUp01, ArrowDown10 } from "lucide-react";

export const sortOptions = [
  { name: "Nuevo", value: "newest", icon: PackagePlus },
  { name: "Precio: Menor a Mayor", value: "price_asc", icon: ArrowUp01 },
  { name: "Precio: Mayor a Menor", value: "price_desc", icon: ArrowDown10 },
];

export const filters = [
  {
    id: "colors",
    name: "Color",
    options: [
      { value: "#ffffff", label: "White" },
      { value: "#000000", label: "Black" },
    ],
  },
  {
    id: "sizes",
    name: "Tallas",
    options: [
      { value: "XS", label: "XS" },
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
      { value: "XL", label: "XL" },
      { value: "XXL", label: "XXL" },
    ],
  },
];
