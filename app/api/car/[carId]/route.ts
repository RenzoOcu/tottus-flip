import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Método PATCH: Actualiza el estado de publicación de un producto
export async function PATCH(
  req: Request,
  { params }: { params: { carId: string } }
) {
  try {
    const { userId } = auth();
    const { carId } = params;
    const { isPublish } = await req.json();

    // Verificar si el usuario está autenticado
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verificar si el producto pertenece al usuario autenticado
    const car = await db.product.findUnique({
      where: { id: carId },
    });

    if (!car || car.userId !== userId) {
      return new NextResponse("Forbidden: You do not own this car", { status: 403 });
    }

    // Actualizar el producto
    const updatedCar = await db.product.update({
      where: {
        id: carId,
      },
      data: {
        isPublish, // solo actualizamos el campo isPublish
      },
    });

    return NextResponse.json(updatedCar);
  } catch (error) {
    console.log("[CAR ID PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Método DELETE: Elimina un producto de la base de datos
export async function DELETE(
  req: Request,
  { params }: { params: { carId: string } }
) {
  try {
    const { userId } = auth();
    const { carId } = params;

    // Verificar si el usuario está autenticado
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verificar si el producto pertenece al usuario
    const car = await db.product.findUnique({
      where: { id: carId },
    });

    if (!car || car.userId !== userId) {
      return new NextResponse("Forbidden: You do not own this car", { status: 403 });
    }

    // Eliminar el producto
    const deletedCar = await db.product.delete({
      where: {
        id: carId,
      },
    });

    return NextResponse.json(deletedCar);
  } catch (error) {
    console.log("[DELETE CAR ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
