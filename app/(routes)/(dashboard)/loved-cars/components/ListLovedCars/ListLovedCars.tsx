"use client";
import { useLovedCars } from "@/hooks/use-loved-cars";
import { product } from "@prisma/client";
import { Heart } from "lucide-react";
import Image from "next/image";
import { ModalAddReservation } from "@/components/Shared/ModalAddReservation";

export function ListLovedCars() {
  const { lovedItems, removeLovedItem } = useLovedCars();

  return (
    <>
      {lovedItems.length === 0 ? (
        <h2>agrega productos que te guste recordar....</h2>
      ) : (
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {lovedItems.map((car: product) => {
            const {
              
              photo,
              name,
              type,
              transmission,
              people,
              engine,
              cv,
              id,
            } = car;

            return (
              <div
                className="p-1 rounded-lg shadow-md hover:shadow-lg"
                key={id}
              >
                <Image
                  src={photo}
                  alt=""
                  width={400}
                  height={600}
                  className="rounded-lg"
                />
                <div className="p-3">
                  <div className="flex flex-col mb-3 gapx-4">
                    <p className="text-xl min-h-16 lg:min-h-fit">{name}</p>
                    <p> $ {car.priceDay} soles</p>
                  </div>
                  <p className="flex items-center">
                    
                  <b>Ctgoria:</b>[ {type} ]
                  </p>
                  <p className="flex items-center">
                  <b>tipo:</b> [{transmission}]
                  </p>
                  <p className="flex items-center">
                  <b>Rareza:</b>  [{people}]
                  </p>
                  <p className="flex items-center">
                  <b>Estado:</b>
                    [{engine}]
                  </p>
                  <p className="flex items-center">
                  <b>codigo:</b>
                    [{cv}] 
                  </p>

                  <div className="flex items-center justify-center gap-x-3">
                    <ModalAddReservation car={car} />
                    <Heart
                      className="mt-2 cursor-pointer fill-black"
                      onClick={() => removeLovedItem(car.id)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}