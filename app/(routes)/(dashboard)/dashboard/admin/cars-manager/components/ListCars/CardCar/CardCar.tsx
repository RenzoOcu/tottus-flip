
"use client"
import { Button } from "@/components/ui/button";

import { Trash, Upload } from "lucide-react";
import { CardCarProps } from "./CardCar.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ButtonEditcar } from "./ButtonEditcar";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export  function CardCar(props: CardCarProps) {
  const {car}=props;
  const { toast } = useToast();
  const router = useRouter();


  const deleteCar = async () => {
    try {
      await axios.delete(`/api/car/${car.id}`);
      toast({ title: "producto eliminado ❌" });
      router.refresh();
    } catch (error) {
      console.log(error)
      toast({
        title: "algo a funcionado mal :/",
        variant: "destructive",
      });
    }
  };
  const handlerPublishCar = async (publish: boolean) => {
    try {
      await axios.patch(`/api/car/${car.id}`, { isPublish: publish });
      if (publish) {
        toast({
          title: "producto publicado",
        });
      } else {
        toast({
          title: "producto despublicado",
        });
      }
      router.refresh();
    } catch (error) {
      console.log(error)
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  
  
  return (
    <div  className="relative p-1 bg-white  rounded-lg  shadow-md hover:shadow-lg">
       <Image
       src={car.photo}
       alt={car.name}
       width={400}
       height={600}
       className="rounded-lg"
       />
        {car.isPublish ? (
        <p className="absolute top-0 right-0 w-full p-1 text-center text-white bg-green-700 rounded-t-lg">
          publico
        </p>
      ) : (
        <p className="absolute top-0 left-0 right-0 w-full p-1 text-center text-white bg-red-900 rounded-t-lg">
          no publico 
        </p>
      )}
       <div className="relative p-3">
        <div className="flex flex-col mb-3 gap-x-4">
          <p className="text-xl min-h-16 lg:min-h-fit">{car.name}</p>
          <p> $ {car.priceDay} soles</p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-4">
          <p className="flex items-start">
               <b>Ctgoria:</b>[ {car.type} ]
          </p>

          <p className="flex items-center">
            <b>tipo:</b> [ {car.transmission}]
          </p>

          <p className="flex items-center">
            <b>Rareza:</b> 
           [ {car.people} ]
          </p>

          <p className="flex items-center">
           <b>Estado:</b>
            [ {car.engine} ]
          </p>

          <p className="flex items-center">
            <b>codigo:</b>
           [ {car.cv} ]
          </p>
        </div>
        <div className="flex justify-between  mt-3  gap-4">
          <Button  variant="outline"  onClick={deleteCar}>
            eliminar
            <Trash  className="w-4 h-4 ml-2"/>
          </Button>
          <ButtonEditcar carData={car} />

        </div>
       {car.isPublish ? 
       <Button
       className="w-full mt-3"
       variant="outline"
       onClick={()=> handlerPublishCar(false)}
       >despublicar 
       <Upload  className="w-4 h-4 ml-2"  />      
       </Button> : <Button
       className="w-full mt-3"
       onClick={()=> handlerPublishCar(true)}
       >publicar
        <Upload  className="w-4 h-4 ml-2"  />   
       </Button>  }

        

      </div>
    </div>
  );
}
