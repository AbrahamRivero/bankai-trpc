import { PackagePlus, ArrowUp01, ArrowDown10, LucideIcon } from "lucide-react";

type SortOption = {
  name: string;
  value: string;
  icon: LucideIcon;
};

export const sortOptions: SortOption[] = [
  { name: "Nuevo", value: "newest", icon: PackagePlus },
  { name: "Precio: Menor a Mayor", value: "price_asc", icon: ArrowUp01 },
  { name: "Precio: Mayor a Menor", value: "price_desc", icon: ArrowDown10 },
];

export const filters = [
  {
    id: "colors",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "beige", label: "Beige" },
      { value: "blue", label: "Blue" },
      { value: "brown", label: "Brown" },
      { value: "green", label: "Green" },
      { value: "purple", label: "Purple" },
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
