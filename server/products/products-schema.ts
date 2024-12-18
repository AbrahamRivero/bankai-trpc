import {
  TypeOf,
  number,
  object,
  string,
  date,
  boolean,
  array,
  coerce,
  enum as enum_,
  union,
} from "zod";

const variantSchema = array(
  object({
    colors: array(string())
      .optional()
      .transform((value) => value ?? []),
    sizes: array(string())
      .optional()
      .transform((value) => value ?? []),
    price: coerce
      .number({ required_error: "Este campo es requerido." })
      .gt(0, { message: "Introduzca un precio superior a 0." }),
    cost: coerce
      .number({ required_error: "Este campo es requerido." })
      .gt(0, { message: "Introduzca un costo superior a 0." }),
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
    permanent_discount: boolean(),
    status: enum_(["active", "draft", "archived"], {
      required_error: "Este campo es requerido.",
      invalid_type_error: "Seleccione el status del producto.",
    }),
    stock: coerce
      .number({ required_error: "Este campo es requerido." })
      .gt(-1, { message: "Introduzca la cantidad disponible del producto." }),
    img_url: string().url().optional(),
  })
);

export const createProductSchema = object({
  name: string({ required_error: "Este campo es requerido." })
    .min(2, {
      message: "El nombre del producto debe tener al menos 2 caracteres.",
    })
    .max(50, {
      message: "El nombre del producto no puede tener más de 50 caracteres.",
    }),
  description: string({ required_error: "Este campo es requerido." })
    .min(2, {
      message: "La descripción del producto debe tener al menos 2 caracteres.",
    })
    .max(500, {
      message:
        "La descripción del producto no puede tener más de 500 caracteres.",
    }),
  base_price: coerce
    .number({ required_error: "Este campo es requerido." })
    .gt(0, {
      message: "Introduzca un precio base superior a 0.",
    }),
  base_cost: coerce
    .number({ required_error: "Este campo es requerido." })
    .gt(0, { message: "Introduzca un costo base superior a 0." }),
  category_id: string({ required_error: "Este campo es requerido." }).min(2, {
    message: "Debe seleccionar una categoría.",
  }),
  variants: variantSchema,
});

export const productsFilterQuery = object({
  query: string().optional(),
  sizes: union([array(string()), string()]).optional(),
  colors: union([array(string()), string()]).optional(),
  category_id: string().optional(),
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type ProductsFilterQueryInput = TypeOf<typeof productsFilterQuery>;
