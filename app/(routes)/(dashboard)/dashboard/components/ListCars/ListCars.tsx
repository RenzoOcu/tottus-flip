"use client";
import { product } from "@prisma/client";

import { ListCarsProps } from "./ListCars.types";
import Image from "next/image";
import {  Heart} from "lucide-react";
import { ModalAddReservation } from "@/components/Shared/ModalAddReservation";
import { useLovedCars } from "@/hooks/use-loved-cars";

export function ListCars(props: ListCarsProps) {
  const { cars } = props;
  const { addLoveItem, lovedItems, removeLovedItem } = useLovedCars();



  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {cars.map((car: product) => {
        const {
          priceDay,
          photo,
          cv,
          engine,
          id,
          people,
          name,
          transmission,
          type,
        } = car;

        const likedCar = lovedItems.some((item) => item.id === car.id);

        return (
          <div key={id} className="p-1 rounded-lg shadow-md hover:shadow-lg">
            <Image
              src={photo}
              alt={name}
              width={400}
              height={600}
              className="rounded-lg"
            />
            <div className="p-3">
              <div className="flex flex-col mb-3 gap-x-4">
                <p className="text-xl min-h-16 lg:min-h-fit">{name}</p>
                <p>$ {priceDay} soles </p>
              </div>
              <p className="flex items-center">
                <b>categoria:</b>
                [{type}]
              </p>
              <p className="flex items-center">
                <b> tp producto:</b>
                [{transmission}]
              </p>
              <p className="flex items-center">
                <b> rareza:</b>
                [{people}]
              </p>
              <p className="flex items-center">
                <b>estado:</b>
                [{engine}]
              </p>
              <p className="flex items-center">
                <b>codigo:</b>
                [{cv}]
              </p>

              <div className="flex items-center justify-center gap-x-3">
                <ModalAddReservation car={car} />
                <Heart
                  className={`mt-2 cursor-pointer ${likedCar && "fill-black"}`}
                  onClick={
                    likedCar
                      ? () => removeLovedItem(car.id)
                      : () => addLoveItem(car)
                  }

                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}