import { product } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type FormEditCarProps = {
  carData: product;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
};