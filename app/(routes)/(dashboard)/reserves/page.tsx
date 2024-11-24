import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TableReserves } from "./components/TableReserves";

export default async function pageReserves() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1 className="mb-4 text-3xl">informacion importante !</h1>
      {orders.length === 0 ? (
        <div className="flex flex-col justify-center gap-4">
          <h2 className="text-xl">entorno de prueba</h2>
          <p>has pedidos de prueba para colaborar el funcionamiento de la aplidadion</p>
          <Link href="/cars">
            <Button>Lista de vehículos</Button>
          </Link>
        </div>
      ) : (
        <TableReserves orders={orders} />
      )}
    </div>
  );
}