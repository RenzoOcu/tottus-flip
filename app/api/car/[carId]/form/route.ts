import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { carId: string } }
) {
  try {
    const { userId } = auth(); // Extraer userId del auth
    const { carId } = params; // Extraer carId de los parámetros de la ruta
    const values = await req.json(); // Leer el cuerpo de la solicitud

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verificar si el producto existe y pertenece al usuario
    const car = await db.product.findFirst({
      where: {
        id: carId,
        userId,
      },
    });

    if (!car) {
      return new NextResponse("Car not found or unauthorized", { status: 404 });
    }

    // Actualizar el producto
    const updatedCar = await db.product.update({
      where: {
        id: carId, // Usar solo el ID, ya que validamos el userId previamente
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(updatedCar);
  } catch (error) {
    console.error("[CAR FORM ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
