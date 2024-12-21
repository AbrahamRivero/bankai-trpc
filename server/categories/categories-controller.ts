import { TRPCError } from "@trpc/server";
import { CreateCategoryInput } from "./categories-schema";
import prisma from "@/prisma/prisma-client";

export const createCategoriesHandler = async ({
  input,
}: {
  input: CreateCategoryInput;
}) => {
  const { name, type, img_url } = input;
  try {
    const category = await prisma.categories.create({
      data: {
        name,
        type,
        img_url,
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

export const getCategoriesByIdHandler = async ({ id }: { id: string }) => {
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
                img_url: true,
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
