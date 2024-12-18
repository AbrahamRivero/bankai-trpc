import prisma from "@/prisma/prisma-client";
import { TRPCError } from "@trpc/server";
import {
  CreateProductInput,
  ProductsFilterQueryInput,
} from "./products-schema";

export const createProductsHandler = async ({
  input,
}: {
  input: CreateProductInput;
}) => {
  const { name, description, base_price, base_cost, category_id, variants } =
    input;
  try {
    const product = await prisma.products.create({
      data: {
        name,
        description,
        base_price,
        base_cost,
        category_id,
        variants: {
          create: variants.map((variant) => {
            const {
              cost,
              price,
              discount,
              permanent_discount,
              discountDateRange,
              colors,
              sizes,
              status,
              stock,
              img_url,
            } = variant;
            return {
              cost,
              price,
              discount,
              permanent_discount,
              discount_from: discountDateRange?.from,
              discount_to: discountDateRange?.to,
              colors,
              sizes,
              status,
              stock,
              img_url,
            };
          }),
        },
      },
    });

    return { status: "success", data: { product } };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const getLatestProductsHandler = async () => {
  try {
    const products = await prisma.products.findMany({
      where: { variants: { some: { status: { equals: "active" } } } },
      select: {
        id: true,
        name: true,
        description: true,
        categories: { select: { name: true } },
        variants: {
          where: {
            status: "active",
          },
          select: {
            id: true,
            price: true,
            cost: true,
            discount: true,
            discount_end_date: true,
            img_url: true,
            stock: true,
          },
        },
      },
      orderBy: {
        base_price: "asc",
      },
      take: 8,
    });

    return products;
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const getFilteredProductsHandler = async ({
  filterQuery,
}: {
  filterQuery: ProductsFilterQueryInput;
}) => {
  try {
    const { category_id, colors, query, sizes } = filterQuery;

    const whereClause: any = {};

    if (query && typeof query === "string" && query.trim() !== "") {
      whereClause.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ];
    }

    if (sizes && Array.isArray(sizes) && sizes.length > 0) {
      whereClause.variants = {
        some: { sizes: { hasSome: sizes } },
      };
    }

    if (colors && Array.isArray(colors) && colors.length > 0) {
      if (!whereClause.variants) {
        whereClause.variants = { some: {} };
      }
      whereClause.variants.some.colors = { hasSome: colors };
    }

    if (
      category_id &&
      typeof category_id === "string" &&
      category_id.trim() !== ""
    ) {
      whereClause.category_id = category_id;
    }

    const products = await prisma.products.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        description: true,
        base_price: true,
        base_cost: true,
        category_id: true,
        variants: true,
        categories: { select: { name: true } },
      },
    });

    const totalPages = Math.ceil(products.length / 12);

    return {
      status: "success",
      results: products.length,
      products,
      totalPages,
    };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};
