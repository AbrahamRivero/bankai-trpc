import { TRPCError } from "@trpc/server";
import { EventCategoryCreationInput } from "./events-categories-schema";
import prisma from "@/prisma/prisma-client";

export const createCategoryHandler = async ({
  input,
}: {
  input: EventCategoryCreationInput;
}) => {
  const { name, slug, description } = input;
  try {
    const category = await prisma.event_categories.create({
      data: {
        name,
        slug,
        description,
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
    const categories = await prisma.event_categories.findMany();

    return categories;
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const fetchCategoryBySlug = async ({ slug }: { slug: string }) => {
  try {
    const category = await prisma.event_categories.findFirst({
      where: { slug: { equals: slug } },
      select: {
        name: true,
        description: true,
        events: {
          select: {
            name: true,
            description: true,
            cover_price: true,
            event_categories: { select: { name: true } },
            slug: true,
            locations: { select: { name: true, address: true } },
            img_url: true,
            event_date: true,
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
