"use client";

import { Button } from "@/components/ui/button";
import {  Heart } from "lucide-react";
import Image from "next/image";
import { useLovedCars } from "@/hooks/use-loved-cars";
import { useAuth } from "@clerk/nextjs";
import { product } from "@prisma/client";
import Link from "next/link";
import { ModalAddReservation } from "@/components/Shared/ModalAddReservation";
import { ListCarsProps } from "./ListCars.types";
import { SkeletonCars } from "@/components/Shared/SkeletonCars";

export function ListCars(props: ListCarsProps) {
  const { cars } = props;
  const { userId } = useAuth();
  const { addLoveItem, lovedItems, removeLovedItem } = useLovedCars();

  if (!cars) {
    return <SkeletonCars />;
  }

  return (
    <>
      {cars.length === 0 && (
        <p>no se encontrado productos con esas especificaciones  :/</p>
      )}
      <div className="grid  md:grid-cols-2 gap-6 lg:grid-cols-4">
        {cars.map((car: product) => {
          const {
            priceDay,
            photo,
            name,
            type,
            transmission,
            people,
            engine,
            cv,
            id,
          } = car;
          const likedCar = lovedItems.some((item) => item.id === car.id);

          return (
            <div key={id} className="p-1 rounded-lg shadow-md hover:shadow-lg">
              <Image
                src={photo}
                alt=""
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

                {userId ? (
                  <div className="flex items-center justify-center gap-x-3">
                    <ModalAddReservation car={car} />
                    <Heart
                      className={`mt-2 cursor-pointer ${
                        likedCar && "fill-black"
                      }`}
                      onClick={
                        likedCar
                          ? () => removeLovedItem(car.id)
                          : () => addLoveItem(car)
                      }
                    />
                  </div>
                ) : (
                  <div className="w-full mt-2 text-center">
                    <Link href="/sign-in">
                      <Button variant="outline" className="w-full">
                        Inicia sesión para reservar
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}