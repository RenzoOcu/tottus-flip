import { product } from "@prisma/client";

export type ListCarsProps = {
  cars: product[] | undefined;
};