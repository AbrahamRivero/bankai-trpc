import { TRPCError } from "@trpc/server";
import { CreateLocationInput } from "./location-schema";
import prisma from "@/prisma/prisma-client";

export const createLocationHandler = async ({
  input,
}: {
  input: CreateLocationInput;
}) => {
  const { name, address } = input;
  try {
    const location = await prisma.locations.create({
      data: {
        name,
        address,
      },
    });

    return { status: "success", data: { location } };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const getLocationsHandler = async () => {
  try {
    const locations = await prisma.locations.findMany();

    return locations;
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};
