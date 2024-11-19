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

export const getCategoriesByIdHandler = async ({ id }: { id: number }) => {
  try {
    const category = await prisma.categories.findFirst({
      where: { id: { equals: id } },
      select: {
        name: true,
        products: {
          select: {
            id: true,
            name: true,
            description: true,
            categories: { select: { name: true } },
            variants: {
              select: {
                id: true,
                image: true,
                price: true,
                discount: true,
                discount_end_date: true,
              },
            },
          },
        },
      },
    });

    return category;
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};
