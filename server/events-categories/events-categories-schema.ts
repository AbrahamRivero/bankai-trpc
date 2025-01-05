import { TypeOf, object, string } from "zod";

export const eventCategoryCreationSchema = object({
  name: string({ required_error: "Este campo es requerido." })
    .min(2, {
      message: "Nombre de la categoría debe tener al menos 2 caracteres.",
    })
    .max(50, {
      message: "Nombre de la categoría no puede tener más de 50 caracteres.",
    }),
  slug: string({ required_error: "Este campo es requerido." })
    .min(2, {
      message: "Slug de la categoría debe tener al menos 2 caracteres.",
    })
    .max(50, {
      message: "Slug de la categoría no puede tener más de 50 caracteres.",
    }),
  description: string({ required_error: "Este campo es requerido." })
    .min(2, {
      message: "El nombre de la categoría debe tener al menos 2 caracteres.",
    })
    .max(50, {
      message: "El nombre de la categoría no puede tener más de 50 caracteres.",
    }),
});

export const slugBasedCategorySearchSchema = object({
  slug: string({ required_error: "Este campo es requerido." }),
});

export type EventCategoryCreationInput = TypeOf<
  typeof eventCategoryCreationSchema
>;
export type SlugBasedCategorySearchInput = TypeOf<
  typeof slugBasedCategorySearchSchema
>;
