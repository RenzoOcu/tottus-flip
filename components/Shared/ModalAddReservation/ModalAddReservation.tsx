import { Button } from "@/components/ui/button";
import { ModalAddReservationProps } from "./ModalAddReservation.types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { product } from "@prisma/client";
import { CalendarSelector } from "./CalendarSelector";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { addDays } from "date-fns";

export function ModalAddReservation(props: ModalAddReservationProps) {
  const { car } = props;
  const {toast}= useToast()

  const [dateSelected, setDateSelected] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });
  
   const onReserveCar = async (car: product, dateSelected: DateRange) => {
    const response = await axios.post("/api/checkout", {
      carId: car.id,
      priceDay: car.priceDay,
      startDate: dateSelected.from,
      endDate: dateSelected.to,
      carName: car.name,
    });
    window.location=response.data.url;
    toast({
      title:"producto agregado :3"
    });






};

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full mt-3">
          mermar productos
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Selecciona la fecha del producto  a mermar
          </AlertDialogTitle>
          <AlertDialogDescription>
            
          <CalendarSelector
              setDateSelected={setDateSelected}
              carPriceDay={car.priceDay}
            />



          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => onReserveCar(car, dateSelected)}>
            mermar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}