import prisma from "@/prisma/prisma-client";
import { TRPCError } from "@trpc/server";
import { ProductBySlugInput } from "./products-schema";
import {
  CreateProductInput,
  ProductsFilterQueryInput,
} from "./products-schema";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";

export const createProductsHandler = async ({
  input,
}: {
  input: CreateProductInput;
}) => {
  const {
    name,
    slug,
    description,
    cost,
    price,
    discount,
    has_discount,
    discountDateRange,
    img_url,
    product_category_id,
    status,
    stock,
    colors,
    sizes,
  } = input;
  try {
    const product = await prisma.products.create({
      data: {
        name,
        slug,
        description,
        product_category_id,
        cost,
        price,
        status,
        img_url,
        discount,
        has_discount,
        discount_start_date: discountDateRange?.from,
        discount_end_date: discountDateRange?.to,
        stock,
        colors,
        sizes,
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
      where: { status: { equals: "active" } },
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
        product_categories: { select: { name: true } },
      },
      orderBy: {
        created_at: "asc",
      },
      take: 8,
    });

    const formattedProducts = products.map((product) => ({
      ...product,
      price: Number(product.price),
    }));

    return formattedProducts;
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
    const { category_slug, colors, query, sizes } = await filterQuery;

    const whereClause: any = {};

    if (query && typeof query === "string" && query.trim() !== "") {
      whereClause.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ];
    }

    if (sizes && Array.isArray(sizes) && sizes.length > 0) {
      whereClause.sizes = { hasSome: sizes };
    }

    if (colors && Array.isArray(colors) && colors.length > 0) {
      whereClause.colors = { hasSome: colors };
    }

    if (
      category_slug &&
      typeof category_slug === "string" &&
      category_slug.trim() !== ""
    ) {
      whereClause.product_categories = {
        slug: { contains: category_slug, mode: "insensitive" },
      };
    }

    const products = await prisma.products.findMany({
      where: whereClause,
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
        product_categories: { select: { name: true } },
      },
    });

    const formattedProducts = products.map((product) => ({
      ...product,
      price: Number(product.price),
    }));

    const totalPages = Math.ceil(products.length / 12);

    return {
      status: "success",
      results: products.length,
      products: formattedProducts,
      totalPages,
    };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const getProductBySlugHandler = async ({
  product_key,
}: {
  product_key: ProductBySlugInput;
}) => {
  const { slug } = product_key;
  try {
    const product = await prisma.products.findFirst({
      where: { slug: { contains: slug, mode: "insensitive" } },
      select: {
        id: true,
        name: true,
        description: true,
        img_url: true,
        price: true,
        discount: true,
        has_discount: true,
        discount_end_date: true,
        colors: true,
        sizes: true,
        stock: true,
        status: true,
        reviews: { select: { rating: true, comment: true } },
        product_categories: { select: { name: true } },
      },
    });

    if (!product) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Product not found",
      });
    }

    const formattedProduct = { ...product, price: Number(product.price) };

    return { status: "success", product: formattedProduct };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};
