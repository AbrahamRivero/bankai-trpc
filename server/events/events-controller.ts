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
    date,
    event_img,
    cover_price,
    category_id,
    location_id,
  } = input;
  try {
    const event = await prisma.events.create({
      data: {
        name,
        description,
        date,
        event_img,
        cover_price: Number(cover_price),
        category_id,
        location_id,
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
        id: true,
        name: true,
        description: true,
        date: true,
        event_img: true,
        cover_price: true,
        locations: { select: { name: true, address: true } },
        slug: true,
      },
      orderBy: {
        date: "desc",
      },
      take: 8,
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
    const { id } = await eventFilterQuery;

    const event = await prisma.events.findUnique({
      where: {
        id,
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
