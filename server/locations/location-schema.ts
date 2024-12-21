import { object, string, TypeOf } from "zod";

export const createLocationSchema = object({
  name: string({ required_error: "Este campo es requerido." }).max(50, {
    message: "El nombre de la ubicación no debe contener más de 50 caracteres.",
  }),
  address: string({ required_error: "Este campo es requerido." }).max(50, {
    message: "La ubicación no debe contener más de 50 caracteres.",
  }),
});

export type CreateLocationInput = TypeOf<typeof createLocationSchema>;
