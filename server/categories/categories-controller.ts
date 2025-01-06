import { TRPCError } from "@trpc/server";
import { CreateCategoryInput } from "./categories-schema";
import prisma from "@/prisma/prisma-client";

export const createCategoriesHandler = async ({
  input,
}: {
  input: CreateCategoryInput;
}) => {
  const { name, slug, description, img_url } = input;
  try {
    const category = await prisma.product_categories.create({
      data: {
        name,
        slug,
        description,
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
    const categories = await prisma.product_categories.findMany();

    return categories;
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const getCategoryBySlugHandler = async ({ slug }: { slug: string }) => {
  try {
    const category = await prisma.product_categories.findFirst({
      where: { slug: { equals: slug } },
      select: {
        name: true,
        products: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            img_url: true,
            price: true,
            discount: true,
            has_discount: true,
            discount_end_date: true,
            product_categories: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const categoryWithFormattedProducts = {
      ...category,
      products: category?.products.map((product) => ({
        ...product,
        price: Number(product.price),
      })),
    };

    return categoryWithFormattedProducts;
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};
