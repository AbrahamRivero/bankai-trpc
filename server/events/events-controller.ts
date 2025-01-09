import { TRPCError } from "@trpc/server";
import { CreateEventInput, EventFilterQueryInput } from "./events-schema";
import prisma from "@/prisma/prisma-client";

export const createEventHandler = async ({
  input,
}: {
  input: CreateEventInput;
}) => {
  const {
    name,
    description,
    event_date,
    img_url,
    cover_price,
    event_category_id,
    event_location_id,
    slug,
  } = input;
  try {
    const event = await prisma.events.create({
      data: {
        name,
        slug,
        description,
        cover_price: Number(cover_price),
        event_date,
        img_url,
        event_category_id,
        event_location_id,
      },
    });

    return { status: "success", data: { event } };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const getEventsHandler = async () => {
  try {
    const events = await prisma.events.findMany();

    return events;
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const getLatestEventsHandler = async () => {
  try {
    const events = await prisma.events.findMany({
      select: {
        name: true,
        description: true,
        slug: true,
        cover_price: true,
        img_url: true,
        event_date: true,
        event_categories: { select: { name: true } },
        locations: { select: { name: true, address: true } },
      },
      orderBy: {
        event_date: "desc",
      },
      take: 4,
    });

    return events;
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const getEventByIdHandler = async ({
  eventFilterQuery,
}: {
  eventFilterQuery: EventFilterQueryInput;
}) => {
  try {
    const { slug } = await eventFilterQuery;

    const event = await prisma.events.findFirst({
      where: {
        slug,
      },
    });

    return event;
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};
