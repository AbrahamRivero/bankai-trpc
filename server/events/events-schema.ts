import { coerce, date, object, string, TypeOf } from "zod";

export const createEventSchema = object({
  name: string().max(50, {
    message: "El nombre del evento no debe contener más de 50 caracteres.",
  }),
  description: string().max(500, {
    message:
      "La descripción del evento no debe contener más de 500 caracteres.",
  }),
  date: date(),
  event_img: string().url().optional(),
  cover_price: coerce
    .number({ required_error: "Este campo es requerido." })
    .gt(0, {
      message: "Introduzca un valor par el cover superior a 0.",
    }),
  category_id: string({ required_error: "Este campo es requerido." }).min(2, {
    message: "Debe seleccionar una categoría.",
  }),
  location_id: string({ required_error: "Este campo es requerido." }).min(2, {
    message: "Debe seleccionar una localización.",
  }),
});

export const eventFilterQuery = object({
  id: string(),
});

export type CreateEventInput = TypeOf<typeof createEventSchema>;
export type EventFilterQueryInput = TypeOf<typeof eventFilterQuery>;
