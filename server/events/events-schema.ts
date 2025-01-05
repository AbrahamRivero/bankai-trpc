import { coerce, date, object, string, TypeOf } from "zod";

export const createEventSchema = object({
  name: string({ required_error: "Este campo es requerido." })
    .min(2, { message: "Debe introducir un nombre." })
    .max(50, {
      message: "El nombre del evento no debe contener más de 50 caracteres.",
    }),
  slug: string({ required_error: "Este campo es requerido." })
    .min(2, { message: "Debe introducir un slug." })
    .max(50, {
      message: "El slug del evento no debe contener más de 50 caracteres.",
    }),
  description: string().max(500, {
    message:
      "La descripción del evento no debe contener más de 500 caracteres.",
  }),
  event_date: date({ message: "Este campo es requerido." }),
  img_url: string().url(),
  cover_price: coerce
    .number({ required_error: "Este campo es requerido." })
    .optional()
    .refine((val) => val === undefined || val >= 0, {
      message: "El valor debe ser mayor o igual a 0.",
    }),
  event_category_id: string({ required_error: "Este campo es requerido." }).min(
    2,
    {
      message: "Debe seleccionar una categoría.",
    }
  ),
  event_location_id: string({ required_error: "Este campo es requerido." }).min(
    2,
    {
      message: "Debe seleccionar una localización.",
    }
  ),
});

export const eventFilterQuery = object({
  slug: string(),
});

export type CreateEventInput = TypeOf<typeof createEventSchema>;
export type EventFilterQueryInput = TypeOf<typeof eventFilterQuery>;
