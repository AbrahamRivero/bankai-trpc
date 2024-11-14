import { TypeOf, number, object, string } from "zod";

export const createUserSchema = object({
  id: string({ required_error: "ID is required" }),
  name: string({ required_error: "Name is required" }),
  email: string({ required_error: "Email is required" }).email("Invalid email"),
  address: string().optional(),
  phone: string().optional(),
});

export const filterQuery = object({
  limit: number().default(1),
  page: number().default(10),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type FilterQueryInput = TypeOf<typeof filterQuery>;
