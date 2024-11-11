import prisma from "@/prisma/prisma-client";
import { TRPCError } from "@trpc/server";
import { CreateCategoryInput } from "./categories-schema";

export const createCategoriesHandler = async ({
  input,
}: {
  input: CreateCategoryInput;
}) => {
  const { name } = input;
  try {
    const category = await prisma.categories.create({
      data: {
        name,
      },
    });

    return { status: "success", data: { category } };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const getCategoriesHandler = async () => {
  try {
    const categories = await prisma.categories.findMany();

    return categories;
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};
