import { TypeOf, enum as enum_, object, string } from "zod";

export const createCategorySchema = object({
  name: string({ required_error: "Este campo es requerido." })
    .min(2, {
      message: "El nombre de la categoría debe tener al menos 2 caracteres.",
    })
    .max(50, {
      message: "El nombre de la categoría no puede tener más de 50 caracteres.",
    }),
  img_url: string().url().optional(),
  type: enum_(["product", "event"], {
    required_error: "Este campo es requerido.",
    invalid_type_error: "Seleccione el tipo de categoría.",
  }),
});

export const searchCategoryByIdSchema = object({
  id: string({ required_error: "Este campo es requerido." }),
});

export const filterCategoriesByTypeSchema = object({
  type: string({ required_error: "Este campo es requerido." }),
});

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>;
export type SearchCategoryByIdInput = TypeOf<typeof searchCategoryByIdSchema>;
export type FilterCategoriesByTypeInput = TypeOf<
  typeof filterCategoriesByTypeSchema
>;
