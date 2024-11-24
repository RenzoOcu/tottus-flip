//error?
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import { ListCars } from "./components/ListCars/ListCars";
import { ButtonAddCar } from "./components/ButtonAddCar";
import { isAdministrator } from "@/lib/isAdministrator";

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId || !isAdministrator(userId)) {
    return redirect("/");
  }

  const car = await db.product.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold"> Panel de Produtos </h2>
        <ButtonAddCar />
      </div>
      <ListCars cars={car} />
    </div>
  );
}
//2:20:58  renzo empiezas desde aqui   