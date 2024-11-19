import { TypeOf, coerce, number, object, string } from "zod";

export const createCategorySchema = object({
  name: string({ required_error: "Este campo es requerido." })
    .min(2, {
      message: "El nombre de la categoría debe tener al menos 2 caracteres.",
    })
    .max(50, {
      message: "El nombre de la categoría no puede tener más de 50 caracteres.",
    }),
});

export const searchCategoryByIdSchema = object({
  id: number({ required_error: "Este campo es requerido." }),
});

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>;
export type SearchCategoryByIdInput = TypeOf<typeof searchCategoryByIdSchema>;
