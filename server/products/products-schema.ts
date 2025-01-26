import {
  TypeOf,
  object,
  string,
  date,
  boolean,
  array,
  coerce,
  enum as enum_,
  union,
} from "zod";

export const createProductSchema = object({
  name: string({ required_error: "Este campo es requerido." })
    .min(2, {
      message: "Nombre del producto debe tener al menos 2 caracteres.",
    })
    .max(50, {
      message: "Nombre del producto no puede tener más de 50 caracteres.",
    }),
  slug: string({ required_error: "Este campo es requerido." })
    .min(2, {
      message: "Slug del producto debe tener al menos 2 caracteres.",
    })
    .max(50, {
      message: "Slug del producto no puede tener más de 50 caracteres.",
    }),
  description: string({ required_error: "Este campo es requerido." })
    .min(2, {
      message: "Descripción del producto debe tener al menos 2 caracteres.",
    })
    .max(500, {
      message: "Descripción del producto no puede tener más de 500 caracteres.",
    }),
  price: coerce.number({ required_error: "Este campo es requerido." }).gt(0, {
    message: "Introduzca un precio superior a 0.",
  }),
  cost: coerce
    .number({ required_error: "Este campo es requerido." })
    .gt(0, { message: "Introduzca un costo superior a 0." }),
  product_category_id: string({
    required_error: "Este campo es requerido.",
  }).min(2, {
    message: "Seleccione una categoría para el producto.",
  }),
  colors: array(string())
    .optional()
    .transform((value) => value ?? []),
  sizes: array(string())
    .optional()
    .transform((value) => value ?? []),
  discount: coerce
    .number()
    .min(0, {
      message:
        "Debe establecer un valor para el descuento igual o superior a 0%.",
    })
    .max(100, {
      message:
        "Debe establecer un valor para el descuento igual o inferior a 100%.",
    }),
  discountDateRange: object({
    from: date().optional(),
    to: date().optional(),
  }).optional(),
  has_discount: boolean(),
  status: enum_(["active", "draft", "archived"], {
    required_error: "Este campo es requerido.",
    invalid_type_error: "Seleccione el status del producto.",
  }),
  stock: coerce
    .number({ required_error: "Este campo es requerido." })
    .gt(-1, { message: "Introduzca la cantidad disponible del producto." }),
  img_url: string().url(),
});

export const productBySlugSchema = object({
  slug: string(),
});

export const productsFilterQuery = object({
  query: string().optional(),
  sizes: union([array(string()), string()]).optional(),
  colors: union([array(string()), string()]).optional(),
  category_slug: string().optional(),
  sort: enum_([
    "price_asc",
    "price_desc",
    "name_asc",
    "name_desc",
    "newest",
  ]).optional(),
  page: coerce.number().int().positive().optional().default(1),
  limit: coerce.number().int().positive().optional().default(12),
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type ProductsFilterQueryInput = TypeOf<typeof productsFilterQuery>;
export type ProductBySlugInput = TypeOf<typeof productBySlugSchema>;
